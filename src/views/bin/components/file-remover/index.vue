<template>
  <div class="file-remover">
    <a-modal v-model="visible" title="删除文件" :zIndex="9999">
      <p>删除的文件暂不支持找回，是否确认彻底删除？</p>
      <template slot="footer">
        <a-space>
          <a-button @click="() => visible = false">取消</a-button>
          <a-button type="danger" @click="handleRemove">彻底删除</a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'file-remover',
  data() {
    return {
      visible: false,
      callback: undefined,
      file: undefined
    }
  },
  methods: {
    open(file, callback) {
      this.file = file
      this.callback = callback
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleRemove() {
      const { type } = this.file
      if (type === 'file') {
        this.$store.dispatch('file/removeFile', this.file).then(() => {
          this.callback && this.callback()
        })
      }
      else {
        this.$store.dispatch('file/removeFolder', this.file).then(() => {
          this.callback && this.callback()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
