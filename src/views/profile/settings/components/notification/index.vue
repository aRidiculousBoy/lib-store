<template>
  <div class="notification"><a-empty :image="simpleImage" /></div>
</template>

<script>
import { Empty } from 'ant-design-vue'
export default {
  name: 'Notification',
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  }
}
</script>

<style scoped lang="less"></style>
