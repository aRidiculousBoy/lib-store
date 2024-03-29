<template>
  <div class="file-list">
    <div class="list-header">
      <div class="right">
        <a-tooltip>
          <span slot="title">
            切换视图(开发中...)
          </span>
          <a-icon type="unordered-list" :size="32" class="icon" />
        </a-tooltip>
        <uploader @uploadFile="handleUploadFile" @createFolder="onCreateFolderClick" />
      </div>
      <file-breadcrumb :items="routeStack" separator=">" :prefix="{ id: 0, name: '文件' }" />
      <div class="left">
        <a-radio>共{{ size }}项</a-radio>
        <a-tooltip>
          <template slot="title">
            搜索文件(开发中...)
          </template>
          <a-icon type="search" :size="32" class="icon" />
        </a-tooltip>
      </div>
    </div>
    <a-spin tip="加载中..." :spinning="loading">
      <div class="main-list" v-if="fileList.length">
        <a-row :gutter="[4, 16]" v-for="row in rowLength" :key="row">
          <a-col :span="3" v-for="file in fileList.slice((row - 1) * 8, row * 8)" :key="file.id">
            <file v-bind="file" @view="handleViewFile" @click="handleFileClick" @rename="handleRename"
              @moveBin="handleMoveBin" @download="handleDownload" @preview="handlePreview" @share="handleShare"
              @dragstart.native="handleDragStart(file, $event)" @dragover.native="handleDragOver(file, $event)"
              @drop.native="handleDrop(file, $event)" @dragleave.native="handleDragLeave(file)" @move="handleMove"
              :class="{ 'high-light': file.id === activeId }" @coShare="handleCoShare" @favor="handleFavor"
              @unFavor="handleUnFavor" />
          </a-col>
        </a-row>
      </div>
      <a-empty v-else :image="simpleImage" description="当前文件夹没有任何文件" />
    </a-spin>
    <file-viewer ref="fileViewerRef" @rename="handleRename" @download="handleDownload" @moveBin="moveBin"
      @share="handleShare" />
    <file-namer ref="fileNamerRef" />
    <create-folder ref="createFolderRef" />
    <transition name="progress-viewer-transition" enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight">
      <progress-viewer v-if="uploadingList.length" ref="progressViewerRef" :runningTasks="uploadingList"
        @pauseUpload="handlePauseUpload" @cancelUpload="handleCancelUpload" @continueUpload="handleContinueUpload"
        @pauseAllUpload="handlePauseAllUpload" @continueAllUpload="handleContinueAllUpload"
        @cancelAllUpload="handleCancelAllUpload" />
    </transition>
    <file-sharer ref="fileSharerRef" />
    <file-mover ref="fileMoverRef" />
    <file-co-sharer ref="fileCoSharerRef" />
    <pdf-viewer ref="pdfViewerRef" />
    <video-player ref="videoPlayerRef" />
    <image-viewer ref="imageViewerRef" />
  </div>
</template>

<script>
import File from './components/file'
import FileViewer from './components/file-viewer'
import FileNamer from './components/file-namer'
import Uploader from './components/uploader'
import CreateFolder from './components/create-folder'
import ProgressViewer from './components/progress-viewer'
import FileSharer from './components/file-sharer'
import FileBreadcrumb from './components/breadcrumb'
import FileMover from './components/file-mover'
import FileCoSharer from './components/file-co-sharer'
import PdfViewer from './components/pdf-viewer'
import VideoPlayer from './components/video-player'
import ImageViewer from './components/image-viewer'


import { Modal } from 'ant-design-vue'
import { createChunks, calculateHash, getExt, compressImageToBase64, video2Base64 } from './utils'
import { uuid } from '@/utils/utils'
import { CHUNKSIZE as Size, CONCURRENT as concurrent } from './constants'
import { VIDEO_TYPES, IMAGE_TYPES, DOC_TYPES } from '@/constants'
import { Empty } from 'ant-design-vue';
import pLimit from 'p-limit'
import axios from 'axios'
import { FILEAPI } from '@/service/modules/file.js'



const limit = pLimit(concurrent)

export default {
  name: 'file-list',
  data() {
    // 文件分块上传成功的回调
    const successCallback = (response, fileContext) => {
      // 暂停被处理为undefined 处理这种边界情况
      if (!response) {
        return false
      }
      if (response.allSuccess) {
        fileContext.isFinished = true
        fileContext.isUploading = false

        // 上传缩略图
        if (IMAGE_TYPES.includes(fileContext.ext)) {
          const payload = {
            id: response.resource.id,
            thumbnail: fileContext.thumbnail
          }

          this.$store.dispatch('file/uploadThumbnail', payload).then(response => {
            this.getPageData(this.$route.params.parentId)
          })
        }
        else if (VIDEO_TYPES.includes(fileContext.ext)) {
          const payload = {
            id: response.resource.id,
            thumbnail: fileContext.thumbnail
          }
          this.$store.dispatch('file/uploadThumbnail', payload).then(response => {
            this.getPageData(this.$route.params.parentId)
          })
        }
        else {
          this.getPageData(this.$route.params.parentId)
        }
      }
      fileContext.successChunks.push(response.chunkNum)
      fileContext.percentage = Math.ceil((fileContext.successChunks.length / fileContext.chunkList.length) * 100)
    }
    // 文件分块上传失败的回调
    const failedCallback = (response, fileContext) => { }

    return {
      folders: [],
      files: [],
      uploadingList: [],
      failedCallback,
      successCallback,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      Size,
      loading: false,
      routeStack: [],
      activeId: undefined
    }
  },
  components: {
    File,
    FileViewer,
    FileNamer,
    Uploader,
    CreateFolder,
    ProgressViewer,
    FileSharer,
    FileBreadcrumb,
    FileMover,
    FileCoSharer,
    PdfViewer,
    VideoPlayer,
    ImageViewer
  },
  methods: {
    async getPageData(parentId) {
      if (!parentId) {
        parentId = this.$route.params.parentId
      }
      this.loading = true
      const payload = {
        parentId
      }
      const res = await this.$store.dispatch('file/getUserFile', payload)
      this.folders = res.folders
      this.files = res.resources
      this.loading = false
    },
    handleViewFile(file) {
      this.$refs.fileViewerRef?.open(file)
    },
    handleFileClick(payload) {
      const { type, id } = payload
      if (type === 'folder') {
        this.$router.push({
          path: `/file-list/${id}`
        })
      } else {
        this.handlePreview(payload)
      }
    },
    handleRename(payload) {
      const callback = () => {
        this.getPageData(this.$route.params.parentId)
        this.$refs.fileViewerRef?.close()
      }
      this.$refs.fileNamerRef?.open(payload, callback)
    },
    handleMoveBin(payload) {
      Modal.confirm({
        title: `${payload.name} - 删除`,
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.moveBin(payload)
        },
        closable: true,
        content: `确定将该文件/文件夹『${payload.name}』移入回收站吗`,
        width: 576
      })
    },
    moveBin(payload) {
      const { type } = payload
      if (type === 'file') {
        this.$store.dispatch('file/removeFile', {
          id: payload.id,
          isPhysical: false
        }).then(() => {
          this.$refs.fileViewerRef?.close()
          this.getPageData(this.$route.params.parentId)
        })
      } else {
        this.$store.dispatch('file/removeFolder', {
          id: payload.id,
          isPhysical: false
        }).then(() => {
          this.$refs.fileViewerRef?.close()
          this.getPageData(this.$route.params.parentId)
        })
      }
    },
    async handleUploadFile(file) {
      const parentId = this.$route.params.parentId
      const fileContext = {
        file,
        parentId,
        filename: file.name,
        hash: undefined,
        chunkList: [],
        fileSize: file.size,
        successChunks: [],
        percentage: 0,
        isUploading: false,
        isFinished: false,
        cancel: undefined,
        ext: getExt(file.name),
        key: uuid(),
        thumbnail: undefined
      }
      // 创建分片列表
      fileContext.chunkList = createChunks(file)
      fileContext.hash = await calculateHash(fileContext.chunkList)
      fileContext.thumbnail = await this.handleSnapshot({ file, type: fileContext.ext })

      this.uploadingList.unshift(fileContext)
      // 云端已经存储?
      let uploadedList = await this.$store.dispatch('file/getFileProgress', {
        hash: fileContext.hash
      })
      uploadedList = Array.isArray(uploadedList) ? uploadedList : new Array(fileContext.chunkList.length)
      const isServerStore = !!uploadedList.length
      if (isServerStore) {
        const length = fileContext.chunkList.length
        fileContext.successChunks = uploadedList
        fileContext.percentage = Math.ceil(uploadedList.length / length * 100)
        if (uploadedList.length === length) {
          fileContext.isFinished = true
          fileContext.chunkList = [fileContext.chunkList[0]]
        }
      }

      fileContext.isUploading = true
      fileContext.chunkList = fileContext.chunkList.map(({ file }, index) => {
        return {
          file,
          index: index + 1,
          fileName: fileContext.hash
        }
      })

      this.handleUploadChunks(fileContext, uploadedList, this.successCallback)
    },
    async handleUploadChunks(fileContext, uploadedList, successCallback, failedCallback) {
      const tasks = []
      const CancelToken = axios.CancelToken
      fileContext.cancel = CancelToken.source()
      fileContext.chunkList.filter(({ index }) => !uploadedList.includes(index))
        .map(({ file, index, fileName }) => {
          const formData = new FormData()
          formData.append('chunkSize', Size)
          formData.append('chunkNum', index)
          formData.append('totalChunkNum', fileContext.chunkList.length)
          formData.append('fileName', fileName)
          formData.append('file', file)
          formData.append('totalSize', fileContext.fileSize)
          formData.append('parentId', fileContext.parentId)
          formData.append('originalName', fileContext.filename)
          return {
            formData,
            index
          }
        })
        .map(({ formData, index }) => {
          tasks.push(
            limit(
              () => this.$store.dispatch('file/uploadChunk', {
                formData,
                cancelToken: fileContext.cancel.token
              })
                .then((response) => {
                  successCallback && successCallback(response, fileContext)
                })
            )
          )
        })
      await Promise.all(tasks)
    },
    async handleDownload(payload) {
      const { type } = payload
      if (type === 'folder') {
        const { id } = payload
        const isEmpty = await this.$store.dispatch('file/getFolderStatus', {
          id
        })
        if (!isEmpty) {
          this.$store.dispatch('file/downloadFile', payload)
        }
        else {
          this.$notification.error({
            message: '操作被拦截',
            description: '该文件夹内无实际意义资源，为防止报错，已拦截下载操作，望见谅。'
          })
        }
      }
      else {
        this.$store.dispatch('file/downloadFile', payload)
      }
    },
    handlePauseUpload(task) {
      task.isUploading = false
      task.cancel.cancel()
    },
    handleCancelUpload({ task, index, callback }) {
      const payload = {
        fileId: task.hash
      }
      this.$store.dispatch('file/cancelUpload', payload).then(response => {
        task.cancel.cancel()
        this.uploadingList.splice(index, 1)
        callback && callback()
      })
    },
    onCreateFolderClick() {
      const callback = () => {
        this.getPageData(this.$route.params.parentId)
      }
      this.$refs.createFolderRef?.open(callback)
    },
    handleContinueUpload(task) {
      task.isUploading = true
      this.handleUploadChunks(task, task.successChunks, this.successCallback)
    },
    handlePauseAllUpload() {
      const uploadingFiles = this.uploadingList.filter(file => file.isUploading)
      for (fileContext of uploadingFiles) {
        this.handlePauseUpload(fileContext)
      }
    },
    handleCancelAllUpload({ callback }) {
      const cancelableFiles = this.uploadingList.filter(file => !file.isFinished)
      const promises = []
      for (let i = 0; i < cancelableFiles.length; i++) {
        const fileContext = cancelableFiles[i]
        const payload = {
          fileId: fileContext.hash
        }
        promises.push(this.$store.dispatch('file/cancelUpload', payload).then(response => {
          const index = this.uploadingList.indexOf(fileContext)
          fileContext.cancel.cancel()
          this.uploadingList.splice(index, 1)
        }))
      }
      Promise.all(promises).then(() => {
        callback && callback()
      })
    },
    handleContinueAllUpload() {
      const pendingFiles = this.uploadingList.filter(file => !file.isFinished && !file.isUploading)
      for (const pendingFile of pendingFiles) {
        this.handleContinueUpload(pendingFile)
      }
    },
    handlePreview(payload) {
      const { extension } = payload
      if (extension === '.pdf') {
        this.$refs.pdfViewerRef?.open(payload)
      }
      else if (VIDEO_TYPES.includes(extension)) {
        const parameters = {
          id: payload.id
        }
        this.$store.dispatch('file/getVideoLocation', parameters).then(response => {
          this.$refs.videoPlayerRef?.open(response, payload.name)
        })
      }
      else if (IMAGE_TYPES.includes(extension)) {
        const { id, type } = payload
        console.log(FILEAPI)
        const url = FILEAPI.DownloadFileAPI + `${type === 'folder' ? 0 : 1}/${id}`
        this.$refs.imageViewerRef?.show([url])
      }
      else if (DOC_TYPES.includes(extension)) {
      }
      else {
        console.log('预览逻辑')
      }
    },
    handleShare(payload) {
      this.$refs.fileSharerRef?.open(payload)
    },
    getFolderPath() {
      const { parentId } = this.$route.params
      const payload = {
        parentId
      }
      // 特殊情况处理 根文件夹 需要触发面包屑导航的更新
      if (parentId === '0') {
        this.routeStack = []
      }
      else {
        this.$store.dispatch('file/getFolderPath', payload).then(response => {
          this.processRelations(response)
        })
      }
    },
    // 对文件夹返回的路径关系进行解析
    processRelations(relation) {
      const stack = []
      let bottomLevel = relation
      while (bottomLevel) {
        const el = {
          name: bottomLevel.name,
          id: bottomLevel.id
        }
        stack.unshift(el)
        bottomLevel = bottomLevel.parent
      }
      this.routeStack = stack
    },
    // 拖拽相关
    handleDragStart(file, e) {
      const { id, type, name } = file
      e.dataTransfer.setData('sourceId', id)
      e.dataTransfer.setData('type', type)
      e.dataTransfer.setData('name', name)
    },
    handleDragOver(file, e) {
      e.preventDefault();
      if (file.type === 'folder') {
        this.activeId = file.id
      }
    },
    handleDragLeave(file) {
      this.activeId = undefined
    },
    handleDrop(file, e) {
      this.activeId = undefined

      const targetType = file.type
      const targetId = file.id
      const id = e.dataTransfer.getData('sourceId')
      const isMovable = targetType === 'folder' && id != targetId
      // 如果目标类型为文件夹才能够进行移动操作
      if (isMovable) {
        const type = e.dataTransfer.getData('type')
        const name = e.dataTransfer.getData('name')
        const parentId = file.id
        const payload = {
          id,
          name,
          parentId
        }
        this.handleMoveFile(type, payload).then(() => {
          const pid = this.$route.params.parentId
          this.getPageData(pid)
        })
      }
    },
    handleMoveFile(type, { id, name, parentId }) {
      // 根据源文件类型调用不同接口
      if (type === 'folder') {
        const payload = {
          id,
          name,
          parentId
        }
        return this.$store.dispatch('file/renameFolder', payload)
      }
      else {
        const payload = {
          resourceId: id,
          originalName: name,
          parentId
        }
        return this.$store.dispatch('file/renameFile', payload)
      }
    },
    handleMove(payload) {
      const callback = () => {
        const pid = this.$route.params.parentId
        return this.getPageData(pid)
      }
      this.$refs.fileMoverRef?.open(payload, callback)
    },
    handleCoShare(payload) {
      this.$refs.fileCoSharerRef?.open(payload)
    },
    handleFavor(payload) {
      this.$store.dispatch('file/collect', payload).then(response => {
        this.getPageData()
      })
    },
    handleUnFavor(payload) {
      this.$store.dispatch('file/unCollect', payload).then(() => { this.getPageData() })
    },
    async handleSnapshot(payload) {
      const { type, file } = payload
      let base64
      if (IMAGE_TYPES.includes(type)) {
        base64 = await compressImageToBase64(file, 0.9)
      }
      else if (VIDEO_TYPES.includes(type)) {
        base64 = await video2Base64(file)
      }
      return base64
    }
  },
  computed: {
    size() {
      return this.folders.length + this.files.length
    },
    // 每行8个 计算出行数
    rowLength() {
      return Math.ceil(this.fileList.length / 8)
    },
    fileList() {
      this.files.forEach((file) => {
        file.name = file.fileName
        file.type = 'file'
        file.size = file.fileSize
        file.extension = file.fileType

        delete file.fileName
        delete file.fileSize
        delete file.fileType
      })
      this.folders.forEach((folder) => {
        folder.id = folder.folderId
        folder.name = folder.folderName
        folder.extension = 'folder'
        folder.type = 'folder'
        delete folder.folderId
        delete folder.folderName
      })

      return [...this.folders, ...this.files]
    }
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler(params) {
        const { parentId } = params
        this.getPageData(parentId)
        this.getFolderPath()
      }
    }
  }
}
</script>

<style scoped lang="less">
.file-list {
  padding: 8px 40px 0 24px;
  background-color: #fff;
}

.list-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 44px;

  .left,
  .right {
    display: flex;
    align-items: center;
    height: 100%;
  }
}

.icon {
  font-size: 22px;
  padding: 6px;
  border-radius: 50%;

  &:hover {
    background-color: #e9e9e9;
    cursor: pointer;
  }
}

.main-list {
  margin-top: 24px;
}

.high-light {
  background-color: rgba(132, 133, 141, .08);
}
</style>
