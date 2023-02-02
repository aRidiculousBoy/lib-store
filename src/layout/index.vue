<template>
  <div class="page-layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible :width="240">
        <div class="logo"> 
          <span class="app-name" :title="appTitle">{{ appTitle }}</span>
        </div>

        <sidebar :collapsed="collapsed" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)" />
          <breadcrumbs />
          <div class="header-right">
            <div class="content">
              <span class="username">a Ridiculous Boy</span>
              <a-dropdown>
                <a-avatar :src="kenan" :size="40" style="cursor:pointer" />
                <a-menu slot="overlay" @click="handleUserMenuClick">
                  <a-menu-item key="faq">
                    帮助中心
                  </a-menu-item>
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
        <a-layout-content :style="{
          margin: '24px 16px',
          padding: '24px',
          minHeight: '280px',
          backgroundColor: '#fff',
          borderTop: '1px solid #e9e9e9'
        }">
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
import kenan from '@assets/images/kenan.jpg'
import { appTitle } from '@/constants'



export default {
  name: 'Layout',
  components: {
    Sidebar,
    Breadcrumbs
  },
  provide() {
    return {
      navigateToHome: this.navigateToHome,
      collapsed: () => this.collapsed,
    }
  },
  data() {
    return {
      collapsed: false,
      kenan,
      appTitle
    }
  },
  methods: {
    navigateToHome() {
      this.$router.push('/')
    },
    handleUserMenuClick({ key }) {
      if (key === 'logout') {
        this.$store.dispatch('user/appLogout').then(() => {
          this.$router.push('/login')
        })
      }
    }
  },
  computed: {
    ...mapState({
      username: (state) => state.user.username
    })
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
  height: 36px;
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
