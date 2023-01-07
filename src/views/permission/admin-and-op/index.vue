<template>
  <a-card>
    <h1>当前角色: {{ $store.state.login.roles[0] }}</h1>
    <div class="admin-op-only">
      这个页面超级管理员(admin)和运营(op)都能访问，但其他角色不能访问
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'AdminAndOp'
}
</script>

<style scoped lang="less"></style>
