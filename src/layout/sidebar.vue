<template>
  <div>
    <a-menu :default-selected-keys="defaultSelectKeys" :default-open-keys="defaultOpenKeys" v-model="currentKeys"
      :open-keys.sync="openKeys" mode="inline" theme="dark" :inline-collapsed="false" :forceSubMenuRender="true">
      <template v-for="menu in routes">
        <a-menu-item v-if="!menu.meta.hasSubMenu" @click="handleMenuClick(menu.path)" :key="menu.children[0].path">
          <a-icon :type="menu.meta.icon" />
          <span>{{ menu.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="menu.path" :menu-info="menu" @menuItemClick="handleMenuClick"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { generateRoutes } from '@/utils/utils.js'
import SubMenu from './submenu.vue'
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const defaultSelectKeys = []
    const defaultOpenKeys = []
    const currentKeys = []
    const openKeys = []
    return {
      defaultSelectKeys,
      defaultOpenKeys,
      currentKeys,
      openKeys
    }
  },
  components: {
    SubMenu
  },
  computed: {
    ...mapState({
      routes: (state) => generateRoutes(state.permission.routers)
    })
  },
  methods: {
    handleMenuClick(path) {
      this.$router.push(path)
    },
  },
  watch: {
    $route: {
      handler(route) {
        const path = route.path
        this.currentKeys = route.matched.map(r => r.path)
        this.defaultSelectKeys = [path]
        const openKeys = route.matched
          .slice(0, route.matched.length - 1)
          .map((item) => item.path)
        this.defaultOpenKeys = openKeys
        this.openKeys = openKeys
      },
      immediate: true
    },
    collapsed(value) {
      if (value) {
        this.openKeys = []
      } else {
        const openKeys = this.$route.matched
          .slice(0, this.$route.matched.length - 1)
          .map((item) => item.path)
        this.openKeys = openKeys
      }
    }
  }
}
</script>

<style scoped lang="less">
#components-layout-demo-custom-trigger {
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
</style>
