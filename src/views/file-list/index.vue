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
        <a-row :gutter="[4, 16]" v-for="row in rowLength">
          <a-col :span="3" v-for="file in fileList.slice((row - 1) * 8, row * 8)">
            <file v-bind="file" @view="handleViewFile" @click="handleFileClick" @rename="handleRename"
              @moveBin="handleMoveBin" @download="handleDownload"></file>
          </a-col>
        </a-row>
      </div>
      <a-empty v-else :image="simpleImage" description="当前文件夹没有任何文件^_^" />
    </a-spin>
    <file-viewer ref="fileViewerRef" @rename="handleRename" @download="handleDownload" @moveBin="moveBin" />
    <file-namer ref="fileNamerRef" />
    <create-folder ref="createFolderRef" />
  </div>
</template>

<script>
import File from './components/file'
import FileViewer from './components/file-viewer'
import FileNamer from './components/file-namer'
import Uploader from './components/uploader'
import CreateFolder from './components/create-folder'

import { Modal } from 'ant-design-vue'
import { createChunks, calculateHash } from './utils'
import { CHUNKSIZE as Size, CONCURRENT as concurrent } from './constants'
import { Empty } from 'ant-design-vue';
import pLimit from 'p-limit'
import axios from 'axios'

const limit = pLimit(concurrent)

export default {
  name: 'file-list',
  data() {
    // 文件分块上传成功的回调
    const successCallback = (response, index) => {
      console.log('response => ', response)
      console.log('index => ', index)
    }
    return {
      folders: [],
      files: [],
      uploadingList: [],
      failedCallback: () => { },
      successCallback,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      Size,
      loading: false
    }
  },
  components: {
    File,
    FileViewer,
    FileNamer,
    Uploader,
    CreateFolder
  },
  methods: {
    async getPageData(parentId) {
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
          path: `/file-list/${id}`,
        })
      } else {
        console.log('文件预览逻辑')
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
        content: `确定将该文件/文件夹【${payload.name}】移入回收站吗`,
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
      const CancelToken = axios.CancelToken
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
        cancel: CancelToken.source()
      }
      // 创建分片列表
      const chunkList = createChunks(file)
      fileContext.hash = await calculateHash(chunkList)
      // 云端已经存储?
      let uploadedList = await this.$store.dispatch('file/getFileProgress', {
        hash: fileContext.hash
      })
      uploadedList = uploadedList === null ? [] : uploadedList
      const isServerStore = !!uploadedList.length

      if (isServerStore) {
        const length = fileContext.chunkList.length
        if (uploadedList.length === length) {
          fileContext.isFinished = true
          return
        }
        fileContext.percentage = Math.ceil(uploadedList.length / length)
      }


      fileContext.chunkList = chunkList.map(({ file }, index) => {
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
                  successCallback && successCallback(response, index)
                })
            )
          )
        })
      await Promise.all(tasks)
    },
    async handleDownload(payload) {
      const { type } = payload
      if (type === 'folder') {
        this.$notification.info({
          message: '抱歉，暂不支持文件夹下载',
          description: '功能开发中...'
        })
      }
      else {
        this.$store.dispatch('file/downloadFile', {
          id: payload.id
        })
      }
    },
    onCreateFolderClick() {
      const callback = () => {
        this.getPageData(this.$route.params.parentId)
      }
      this.$refs.createFolderRef?.open(callback)
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
      }
    }
  }
}
</script>

<style scoped lang="less">
.file-list {
  padding: 8px 40px 0 24px;
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
</style>
