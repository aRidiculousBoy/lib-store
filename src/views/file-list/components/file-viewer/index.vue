<template>
  <div class="file-viewer">
    <a-modal v-model="visible" :footer="null" :width="608" :title="file.name + ' - 详细信息'">
      <a-descriptions bordered :column="6">

        <a-descriptions-item label="文件名称" :span="6">
          <div :title="file.name" class="file-name">
            {{ file.name }}
            <a-icon type="copy" v-copy="{ text: file.name, callback: copyCallback }"
              :style="{ verticalAlign: 'top', marginLeft: '2px', cursor: 'pointer', transform: 'scale(0.92)' }" />
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="文件类型" :span="6">
          {{ file.type | typeFilter }}
        </a-descriptions-item>
        <a-descriptions-item label="文件大小" :span="2">
          {{ file.size | sizeFilter }}
        </a-descriptions-item>
        <a-descriptions-item label="扩展名" :span="4">
          {{ file.extension | extensionFilter }}
        </a-descriptions-item>
        <a-descriptions-item label="状态" :span="2">
          <a-badge v-if="file.share" status="success" text="分享中" />
          <a-badge v-else status="default" text="未分享" />
        </a-descriptions-item>
        <a-descriptions-item label="创建日期" :span="4">
          {{ file.createTime }}
        </a-descriptions-item>
        <a-descriptions-item label="操作" :span="6">
          <a-space>
            <a @click="handleDownload">下载</a>
            <a-divider type="vertical"></a-divider>
            <a v-if="file.share">取消分享</a>
            <a v-else @click="handleShare">分享</a>
            <a-divider type="vertical"></a-divider>
            <a @click="handleRename">重命名</a>
            <a-divider type="vertical"></a-divider>
            <a-popconfirm title="确定将该文件/文件夹移入回收站吗？" ok-text="确定" cancel-text="取消" @confirm="handleMoveBin">
              <a>移至回收站</a>
            </a-popconfirm>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { copy } from '@/directives'

export default {
  name: 'file-viewer',
  data() {
    return {
      file: {
        id: undefined,
        name: undefined,
        size: undefined,
        type: undefined,
        extension: undefined,
        createTime: undefined,
        share: false,
        fileId: undefined
      },
      visible: false
    }
  },
  computed: {
    isFolder() {
      return this.file.type === 'folder'
    }
  },
  methods: {
    open(file) {
      this.visible = true
      this.file = file
    },
    close() {
      this.visible = false
    },
    handleRename() {
      const payload = {
        name: this.file.name,
        id: this.file.id,
        type: this.file.type
      }
      this.$emit('rename', payload)
    },
    handleDownload() {
      const payload = {
        type: this.file.type,
        id: this.file.fileId
      }
      this.$emit('download', payload)
    },
    handleMoveBin() {
      const payload = {
        id: this.file.id,
        type: this.file.type
      }
      this.$emit('moveBin', payload)
    },
    handleShare() {
      const payload = {
        id: this.file.id,
        name: this.file.name,
        type: this.file.type
      }
      this.$emit('share', payload)
    },
    copyCallback() {
      this.$message.success({
        content: '复制成功',
        duration: 1
      })
      console.log()
    }
  },
  filters: {
    typeFilter(type) {
      if (type === 'file') {
        return '文件'
      } else {
        return '文件夹'
      }
    },
    extensionFilter(ext) {
      if (ext === 'folder') {
        return '-'
      } else {
        return ext
      }
    },
    sizeFilter(size) {
      if (!size) {
        return '-'
      } else {
        return (size / 1024 / 1024).toFixed(2) + 'M'
      }
    }
  },
  directives: {
    copy
  }
}
</script>

<style scoped lang="less">
.file-name {
  width: 360px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/.ant-modal-title {
  width: 88%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
