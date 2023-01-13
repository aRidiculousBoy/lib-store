<template>
  <div class="page-404">
    <a-result title="404 NotFound" sub-title="很抱歉，你访问的页面地址有误，或者该页面不存在！">
      <template #icon>
        <img :src="NotFound" />
      </template>
      <template #extra>
        <a-button type="primary" @click="navigateToHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import NotFound from '@/assets/svg/404.svg'
export default {
  name: 'NotFound',
  data() {
    return {
      NotFound
    }
  },
  methods: {
    navigateToHome() {
      this.$router.replace({
        path: '/'
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
