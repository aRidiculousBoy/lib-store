<template>
  <a-card>
    <h1>当前角色: {{ $store.state.login.roles[0] }}</h1>
    <div class="all">
      所有角色可访问
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'All'
}
</script>

<style scoped lang="less"></style>
