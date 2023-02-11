<template>
  <div class="page-settings">
    <a-layout style="padding: 24px 0; background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :default-selected-keys="['基本设置']"
          style="height: 100%"
          v-model="selectedKeys"
        >
          <a-menu-item v-for="setting in settings" :key="setting">{{ setting }}</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="content" style="padding: 0 50px">
        <component :is="currentComponent"></component>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import DefaultSettings from './components/defaultSettings'
import AccountBindings from './components/accountBindings'
import SecureSettings from './components/secureSettings'
import Notification from './components/notification'

const componentsMap = {
  '基本设置': DefaultSettings,
  '安全设置': SecureSettings,
  '账号绑定': AccountBindings,
  '消息通知': Notification
}

export default {
  name: 'Profile-Settings',
  components: {},
  data() {
    const settings = ['基本设置', '安全设置', '账号绑定', '消息通知']
    const selectedKeys = ['基本设置']
    return {
      settings,
      selectedKeys
    }
  },
  computed: {
    currentComponent() {
      return componentsMap[this.selectedKeys[0]]
    }
  }
}
</script>

<style scoped lang="less">
.page-settings {
  padding: 32px;
}
/deep/.ant-card-body {
  padding: 16px 0;
}

.content {
  padding-left: 32px !important;
}
</style>
