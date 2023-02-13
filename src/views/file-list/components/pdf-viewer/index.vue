<template>
  <div class="pdf-viewer">
    <a-modal v-model="visible" :footer="null" :title="title" width="100%" :dialog-style="{ top: '0px' }">
      <iframe :src="pdfSrc" frameborder="0" style="width: 100%;height: 100vh"></iframe>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'pdf-viewer',
  data() {
    return {
      visible: false,
      pdfSrc: null,
      title: undefined
    }
  },
  methods: {
    open(file) {
      const { id, name } = file
      this.title = '预览' + ' - ' + name
      this.pdfSrc = '/api/user/resource/file/1/' + id
      this.visible = true
    },
    close() {
      this.visible = false
      this.pdfSrc = null
    }
  }
}
</script>

<style scoped lang="less">

</style>
