<template>
  <div class="page-layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible :width="240">
        <div class="logo">
          <img :src="Logo" style="width: 72px; transform: scale(2, 2.2) translateY(6px)" />
          <span class="app-name" :title="appTitle">{{ appTitle }}</span>
        </div>

        <sidebar :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout class="layout-content">
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <breadcrumbs />
          <div class="header-right">
            <div class="content">
              <span class="username">{{ username }}</span>
              <a-dropdown placement="bottomCenter">
                <a-avatar :src="avatar" :size="40" style="cursor: pointer" />
                <a-menu slot="overlay" @click="handleUserMenuClick">
                  <a-menu-item key="help"> 帮助中心 </a-menu-item>
                  <a-menu-item key="user-setting">
                    <a>个人设置</a>
                  </a-menu-item>
                  <a-menu-item key="logout">
                    <a>退出登录</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            minHeight: '280px',
            backgroundColor: '#fff',
            borderTop: '1px solid #e9e9e9'
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
import { mapState } from 'vuex'
import { appTitle, DEFAULT_AVATAR } from '@/constants'
import Logo from '@/assets/svg/logo.svg'

const clickMap = {
  logout: 'handleLogout',
  'user-setting': 'handleSetting',
  help: 'handleHelp'
}

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
      appTitle,
      Logo,
      collapsed: false
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push('/')
    },
    handleUserMenuClick({ key }) {
      const runner = this[clickMap[key]]
      runner && runner()
    },
    handleLogout() {
      this.$store.dispatch('user/appLogout').then(() => {
        this.$router.push('/login')
      })
    },
    handleSetting() {
      this.$router.push('/user-center')
    },
    handleHelp() {}
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username,
      avatar: (state) => state.user.avatar || DEFAULT_AVATAR
    })
  }
}
</script>

<style scoped lang="less">
.page-layout,
.ant-layout {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

.layout-content {
  overflow-y: scroll;

  &::-webkit-scrollbar {
    max-width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e9e9e9e9;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
  overflow: hidden;
}

.ant-layout-header {
  display: flex;

  align-items: center;
}

/deep/.ant-layout-content {
  padding: 0 !important;
  margin: 0 !important;
}

.header-right {
  flex: 1;
  margin: 0 32px;

  .username {
    margin: 0 12px;
  }
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.app-name {
  font-size: 24px;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
