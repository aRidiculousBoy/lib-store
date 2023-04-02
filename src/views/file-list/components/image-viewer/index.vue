<template>
  <viewer :images="images">
  </viewer>
</template>

<script>
export default {
  name: 'image-viewer',
  data() {
    return {
      images: []
    }
  },
  methods: {
    show(images) {
      this.images = images
      this.$viewerApi({
        images: this.images
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
