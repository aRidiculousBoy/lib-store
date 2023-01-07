<template>
  <a-card>
    <h1>当前角色: {{ $store.state.login.roles[0] }}</h1>
    <div class="op-only">
      这个页面有运营人员(op)才能访问
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'OpOnly'
}
</script>

<style scoped lang="less"></style>
