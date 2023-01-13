<template>
  <div class="file-namer">
    <a-modal v-model="visible" :title="file.rawName + ' - 重命名'" okText="确定" cancelText="取消" @ok="handleRename"
      :z-index="9999">
      <a-input v-model="file.name"></a-input>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'file-namer',
  data() {
    return {
      visible: false,
      file: {
        id: undefined,
        name: undefined,
        rawName: undefined,
        type: undefined
      },
      callback: undefined
    }
  },
  methods: {
    open(file, callback) {
      this.file = file
      this.file.rawName = file.name
      this.visible = true
      this.callback = callback
    },
    close() {
      this.visible = false
    },
    handleRename() {
      let payload
      if (this.file.type === 'file') {
        payload = {
          originalName: this.file.name,
          parentId: this.$route.params.parentId,
          resourceId: this.file.id
        }
        this.$store.dispatch('file/renameFile', payload)
          .then(() => {
            this.close()
            this.callback && this.callback()
          })
      }
      else {
        payload = {
          id: this.file.id,
          name: this.file.name,
          parentId: this.$route.params.parentId
        }
        this.$store.dispatch('file/renameFolder', payload)
          .then(() => {
            this.close()
            this.callback && this.callback()
          })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
