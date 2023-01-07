<template>
  <div class="page-500">
    <a-result title="Server Error" sub-title="很抱歉，遇到一些临时服务器问题，请稍后再试！">
      <template #icon>
        <img :src="ServerError" />
      </template>
      <template #extra>
        <a-button type="primary" @click="navigateToHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import ServerError from '@/assets/svg/500.svg'
export default {
  name: 'ServerError',
  inject: ['navigateToHome'],
  data() {
    return {
      ServerError
    }
  }
}
</script>

<style scoped lang="less"></style>
