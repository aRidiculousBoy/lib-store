<template>
  <div class="page-403">
    <a-result
      title="403 Unauthorized"
      sub-title="很抱歉，您没有访问该页面的权限，请联系管理员！"
    >
      <template #icon>
        <img :src="UnAuthorization" />
      </template>
      <template #extra>
        <a-button type="primary" @click="navigateToHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import UnAuthorization from '@/assets/svg/403.svg'
export default {
  name: 'UnAuthorization',
  inject: ['navigateToHome'],
  data() {
    return {
      UnAuthorization
    }
  }
}
</script>

<style scoped lang="less"></style>
