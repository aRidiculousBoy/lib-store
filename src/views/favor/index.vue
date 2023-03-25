<template>
  <div class="favor-page">
    <a-spin tip="加载中..." :spinning="loading">
      <div class="main-list" v-if="fileList.length">
        <a-row :gutter="[4, 16]" v-for="row in rowLength" :key="row">
          <a-col :span="3" v-for="file in fileList.slice((row - 1) * 8, row * 8)" :key="file.id">
            <file v-bind="file" @view="handleViewFile" @click="handleFileClick" @rename="handleRename"
              @moveBin="handleMoveBin" @download="handleDownload" @preview="handlePreview" @share="handleShare"
              @dragstart.native="handleDragStart(file, $event)" @dragover.native="handleDragOver(file, $event)"
              @drop.native="handleDrop(file, $event)" @dragleave.native="handleDragLeave(file)" @move="handleMove"
              :class="{ 'high-light': file.id === activeId }" @coShare="handleCoShare" @unFavor="handleUnFavor" />
          </a-col>
        </a-row>
      </div>
      <a-empty v-else :image="simpleImage" description="当前文件夹没有任何文件" />
    </a-spin>
    <file-viewer ref="fileViewerRef" @rename="handleRename" @download="handleDownload" @moveBin="moveBin"
      @share="handleShare" />
    <file-namer ref="fileNamerRef" />
    <file-sharer ref="fileSharerRef" />
    <file-mover ref="fileMoverRef" />
    <file-co-sharer ref="fileCoSharerRef" />
  </div>
</template>

<script>
import File from './components/file'
import FileViewer from '@/views/file-list/components/file-viewer'
import FileNamer from '@/views/file-list/components/file-namer'
import FileSharer from '@/views/file-list/components/file-sharer'
import FileMover from '@/views/file-list/components/file-mover'
import FileCoSharer from '@/views/file-list/components/file-co-sharer'
import { Modal } from 'ant-design-vue'


import { Empty } from 'ant-design-vue';

export default {
  name: 'favor',
  data() {
    return {
      folders: [],
      files: [],
      loading: false,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      activeId: undefined
    }
  },
  components: {
    File,
    FileViewer,
    FileNamer,
    FileSharer,
    FileMover,
    FileCoSharer
  },
  created() {
    this.getPageData()
  },
  methods: {
    getPageData() {
      this.loading = true
      this.$store.dispatch('file/getCollectList').then(response => {
        this.folders = response.folders
        this.files = response.resources
      }).finally(() => {
        this.loading = false
      })
    },
    handleViewFile(file) {
      this.$refs.fileViewerRef?.open(file)
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
      else {
        console.log('预览逻辑')
      }
    },
    handleShare(payload) {
      this.$refs.fileSharerRef?.open(payload)
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
    handleUnFavor(payload) {
      this.$store.dispatch('file/unCollect', payload).then(this.getPageData)
    },
    handleFileClick(file) {
      const isFolder = file.type === 'folder'
      if (isFolder) {
        const route = {
          path: 'file-list/' + file.id
        }
        this.$router.push(route)
      }
      else {

      }
    }
  },
  computed: {
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
    },
    rowLength() {
      return Math.ceil(this.fileList.length / 8)
    },
    size() {
      return this.folders.length + this.files.length
    }
  }
}
</script>

<style scoped lang="less">
.favor-page {
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
