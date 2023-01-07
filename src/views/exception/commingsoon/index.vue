<template>
  <div class="page-comming-soon">
    <a-result title="Comming Soon" sub-title="很抱歉，当前页面正在开发或维护中，敬请期待！">
      <template #icon>
        <img :src="CommingSoon" />
      </template>
      <template #extra>
        <a-button type="primary" @click="navigateToHome">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import CommingSoon from '@/assets/svg/commingsoon.svg'
export default {
  name: 'CommingSoon',
  inject: ['navigateToHome'],
  data() {
    return {
      CommingSoon
    }
  }
}
</script>

<style scoped lang="less"></style>
