<template>
  <div class="secure-settings">
    <h3 class="title">安全设置</h3>
    <safety-item v-for="item in safetyList" :key="item.title" v-bind="item"></safety-item>
  </div>
</template>

<script>
import SafetyItem from './components/safetyItem'
export default {
  name: 'Secure-Setting',
  components: {
    SafetyItem
  },
  data() {
    const safetyList = [
      {
        title: '账号密码',
        desc: '当前密码强度： 强'
      },
      {
        title: '密保手机',
        desc: '已绑定手机：180****8888'
      },
      {
        title: '密保问题',
        desc: '未设置密保问题，密保问题可有效保护账户安全'
      },
      {
        title: '备用邮箱',
        desc: '已绑定邮箱：exam****@example.com'
      }
    ]
    return {
      safetyList
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
}
.safety-item:not(:last-child) {
  border-bottom: 1px solid #e8e8e8;
}
</style>
