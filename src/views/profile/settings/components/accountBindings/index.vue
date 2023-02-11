<template>
  <div class="account-bindings">
    <div class="title">账号绑定</div>
    <binding-item v-for="item in bindingItems" :key="item.app" v-bind="item"></binding-item>
  </div>
</template>

<script>
import bindingItem from './components/bindingItem'
export default {
  name: 'AccountSetting',
  data() {
    const bindingItems = [
      {
        app: '淘宝',
        bindingState: false
      },
      {
        app: '支付宝',
        bindingState: true
      },
      {
        app: '钉钉',
        bindingState: true
      },
      {
        app: '微信',
        bindingState: false
      }
    ]
    return {
      bindingItems
    }
  },
  components: {
    bindingItem
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
}
.binding-item:not(:last-child) {
  border-bottom: 1px solid #e8e8e8;
}
</style>
