<template>
  <div class="bin-page">
    <a-spin tip="加载中..." :spinning="loading">
      <div class="main-list" v-if="list.length">
        <a-row :gutter="[4, 16]" v-for="row in rowLength" :key="row">
          <a-col :span="3" v-for="binFile in binFileList.slice((row - 1) * 8, row * 8)" :key="binFile.id">
            <bin-file :key="binFile.id" v-bind="binFile" @delete="handleDelete" @recover="handleRecover"
              @view="handleViewDetails" />
          </a-col>
        </a-row>
      </div>
      <a-empty v-else description="当前文件夹没有任何文件" />
    </a-spin>
    <bin-file-viewer ref="binFileViewerRef" @recover="handleRecover" @delete="handleDelete"></bin-file-viewer>
    <file-remover ref="fileRemoverRef"></file-remover>
  </div>
</template>

<script>
import BinFile from './components/bin-file'
import BinFileViewer from './components/bin-file-viewer'
import FileRemover from './components/file-remover'

export default {
  name: 'bin',
  components: {
    BinFile,
    BinFileViewer,
    FileRemover
  },
  data() {
    return {
      list: [],
      loading: false
    }
  },
  created() {
    this.getBinFile()
  },
  methods: {
    getBinFile() {
      this.loading = true
      this.$store.dispatch('bin/getBinFile').then(response => {
        this.list = response
        this.loading = false
      })
    },
    handleDelete(payload) {
      const callback = () => {
        this.$refs.fileRemoverRef?.close()
        this.$refs.binFileViewerRef?.close()
        this.getBinFile()
      }
      this.$refs.fileRemoverRef?.open(payload, callback)
    },
    handleRecover(payload) {
      const { type } = payload
      if (type === 'file') {
        this.$store.dispatch('file/recoverFile', payload).then(this.getBinFile)
      }
      else {
        this.$store.dispatch('file/recoverFolder', payload).then(this.getBinFile)
      }
    },
    handleViewDetails(payload) {
      this.$refs.binFileViewerRef?.open(payload)
    }
  },
  computed: {
    // 每行8个 计算出行数
    rowLength() {
      return Math.ceil(this.list.length / 8)
    },
    binFileList() {
      return this.list.map((binFile) => {
        const file = {}
        file.name = binFile.originalName
        file.id = binFile.resourceId
        file.type = binFile.typeId === 0 ? 'folder' : 'file'
        file.deleteTime = binFile.deleteTime
        file.parentId = binFile.parentId
        return file
      })
    }
  }
}
</script>

<style scoped lang="less">
.bin-page {
  padding: 8px 40px 0 24px;
  background-color: #fff;
}

.main-list {
  margin-top: 24px;
}
</style>
