<template>
  <div class="bin-file-viewer">
    <a-modal v-model="visible" :footer="null" :width="608">
      <a-descriptions bordered :column="6">
        <a-descriptions-item label="文件名称" :span="6">
          <div :title="file.name" class="file-name">
            {{ file.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="文件类型" :span="6">
          {{ file.type | typeFilter }}
        </a-descriptions-item>
        <a-descriptions-item label="删除日期" :span="6">
          {{ file.deleteTime }}
        </a-descriptions-item>
        <a-descriptions-item label="操作" :span="6">
          <a-space>
            <a @click="handleRecover">恢复</a>
              <a href="#" @click="handleDelete">彻底删除</a>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
      <template slot="title">
        <p class="title">{{ file.name + ' - ' + '详细信息'}}</p>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'bin-file-viewer',
  data() {
    return {
      file: {},
      visible: false
    }
  },
  methods: {
    open(file) {
      this.file = file
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleRecover() {
      const payload = this.file
      this.$emit('recover', payload)
    },
    handleDelete() {
      const { type, id } = this.file
      const payload = {
        id,
        type,
        isPhysical: true
      }
      this.$emit('delete', payload)
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
  }
}
</script>

<style scoped lang="less">
.title {
  width: 92%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-name {
  width: 360px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
