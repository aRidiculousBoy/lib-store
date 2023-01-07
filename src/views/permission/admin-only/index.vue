<template>
  <a-card>
    <h1>当前角色: {{ $store.state.login.roles[0] }}</h1>
    <div class="admin-only">
      这个页面只有超级管理员(admin)才能访问
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'AdminOnly'
}
</script>

<style scoped lang="less"></style>
