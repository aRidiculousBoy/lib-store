<template>
  <div class="page-layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible :width="240">
        <div class="logo" />
        <sidebar :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <breadcrumbs />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            minHeight: '280px'
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sidebar from './sidebar.vue'
import Breadcrumbs from './breadcrumbs.vue'


export default {
  name: 'Layout',
  components: {
    Sidebar,
    Breadcrumbs
  },
  provide() {
    return {
      navigateToHome: this.navigateToHome,
      collapsed: () => this.collapsed
    }
  },
  data() {
    return {
      collapsed: false
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.page-layout,
.ant-layout {
  width: 100%;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.ant-layout-header {
  display: flex;
  align-items: center;
}


/deep/.ant-layout-content {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
