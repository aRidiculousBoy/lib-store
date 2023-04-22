<template>
  <div class="share-details-page">
    <div class="validator" v-if="!fetchStatus">
      <span class="app-title app-text">Lib-Store</span>
      <a-card class="fetch-action">
        <span class="validator-text">请输入提取码：</span>
        <a-input-password v-model="fetchCode" style="width: 100%"></a-input-password>
        <a-button type="primary" @click="handleFetch" :loading="fetching">提取文件</a-button>
      </a-card>
    </div>
    <a-layout v-else id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <div class="logo">
          <img :src="Logo" style="width: 72px;transform:scale(3,3.2) translateY(6px);">
          <span class="app-name" :title="appTitle">{{ appTitle }}</span>
        </div>
        <a-avatar :src="kenanJpg" :size="44"></a-avatar>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <a-spin :spinning="loading" tip="加载中...">
          <div v-if="!isExpired" class="content" style="display: flex;height: 96%">
            <a-card style="flex: 5">
              <div class="page-header">
                <span>面包屑</span>
                <a-button type="primary" @click="handleTransfer">全部保存到我的云盘</a-button>
              </div>
              <a-divider></a-divider>
              <div class="list">
                <a-row :gutter="[4, 16]" v-for="row in rowLength" :key="row">
                  <a-col :span="4" v-for="file in useFileList.slice((row - 1) * 6, row * 6)" :key="file.id">
                    <file v-bind="file" @transfer="handleTransfer" @click="handleFileClick" @download="handleDownload" />
                  </a-col>
                </a-row>
              </div>
            </a-card>
            <a-card style="flex: 1">
              <span>分享人</span>
              <div style="text-align: center">
                <a-avatar :src="kenanJpg" :size="256"></a-avatar>
                <br />
                <span class="user-name">a Ridiculous Boy</span>
              </div>
            </a-card>
          </div>
          <a-card v-else>
            <a-result title="资源已过期">
              <template #icon>
                <a-icon type="warning" theme="twoTone" />
              </template>
              <template #extra>
                <a-button type="primary" @click="() => $router.replace('/')">
                  返回首页
                </a-button>
              </template>
            </a-result>
          </a-card>
        </a-spin>
      </a-layout-content>
      <file-saver ref="fileSaverRef" v-if="isLogin" />
    </a-layout>
  </div>
</template>

<script>
import kenanJpg from '@/assets/images/kenan.jpg'
import { ERROR_FETCH_TEXT } from '@/constants'
import { appTitle } from '@/constants'
import Logo from '@/assets/svg/logo.svg'

import File from './components/file'
import FileSaver from './components/file-saver'

export default {
  name: 'share-details',
  components: {
    File,
    FileSaver
  },
  created() {
    this.init()
  },
  data() {
    const isLogin = !!(this.$store.state.user.token)
    return {
      list: [],
      loading: false,
      fetchStatus: 0,
      isExpired: false,
      fetching: false,
      fetchCode: undefined,
      kenanJpg,
      appTitle,
      Logo,
      isLogin
    }
  },
  methods: {
    getDeepResource() {
      const shareName = this.$route.params.shareName
      const id = this.$route.params.parentId
      if (shareName && id) {
        const payload = {
          id
        }
        this.loading = true
        this.$store.dispatch('share/getDeepResource', payload).then(response => {
          this.list = this.clickParser(response)
        }).finally(() => {
          this.loading = false
        })
      }
      else {
        this.handleFetch()
      }
    },
    handleFetch() {
      const isValid = this.fetchCode && this.fetchCode !== '' && this.fetchCode?.trim() !== ''
      if (isValid) {
        this.fetching = true
        Promise.all([this.handleGetShare(), this.handleValidateShare()]).then(response => {
          const share = response[0]
          const isExpired = response[1]
          // 先判断提取码是否正确
          if (share === ERROR_FETCH_TEXT) {
            this.$message.error('提取码错误')
            // 清除验证码
            this.fetchCode = undefined
          }
          else {
            // 提取码正确 判断资源是否过期
            if (isExpired) {
              this.isExpired = true
              this.fetchStatus = 1
            }
            else {
              //  提取码正确 资源未过期 
              this.fetchStatus = 1
              this.list = [response[0]]

              // 存储校验码 刷新时使用
              const shareName = this.$route.params.shareName
              sessionStorage.setItem(shareName, this.fetchCode)
            }
          }
        }).finally(() => {
          this.fetching = false
        })
      }
      else {
        this.$message.error('验证码不能为空')
      }
    },
    handleValidateShare() {
      const shareName = this.$route.params.shareName
      const payload = {
        shareName: shareName,
      }
      return this.$store.dispatch('share/validateShare', payload)
    },
    handleGetShare() {
      const shareName = this.$route.params.shareName
      const payload = {
        name: shareName,
        type: 1,
        fetchCode: this.fetchCode
      }
      return this.$store.dispatch('share/getShareResource', payload)
    },
    handleTransfer(file) {
      this.$refs.fileSaverRef?.open(file)
    },
    handleFileClick(payload) {
      const { type, id } = payload
      if (type === 'folder') {
        const shareName = this.$route.params.shareName
        const route = `/share-details/${shareName}/folder/${id}`
        this.$router.push({
          path: route,
          query: Date.now()
        })
      } else {
        this.handlePreview(payload)
      }
    },
    handleDownload(file) {
      this.$store.dispatch('file/downloadShare', file)
    },
    clickParser(data) {
      let list = [...data.folders, ...data.resources]
      list = list.map(file => {
        return {
          id: file.id || file.folderId,
          shareName: file.folderName || file.fileName,
          originalName: file.folderName || file.fileName,
          type: file.folderId ? 0 : 1,
          extension: file.folderId ? 'folder' : file.fileType
        }
      })
      return list
    },
    handlePreview() {
      console.log('预览逻辑实现')
    },
    // 用户刷新 如果之前有访问记录 则跳过校验步骤
    init() {
      const shareName = this.$route.params.shareName
      const fetchCode = sessionStorage.getItem(shareName)
      if (fetchCode) {
        this.fetchCode = fetchCode
        this.handleFetch()
      }
    }
  },
  computed: {
    useFileList() {
      return this.list.map(file => {
        return {
          originalName: file.originalName,
          shareName: file.shareName,
          type: file.type === 1 ? 'file' : 'folder',
          extension: file.type === 1 ? file.extension : 'folder',
          id: file.userResourceId || file.id
        }
      })
    },
    rowLength() {
      return Math.ceil(this.list.length / 6)
    },
  },
  watch: {
    '$route.params': {
      handler(value) {
        this.getDeepResource()
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-layout {
  height: 100%;
}

.share-details-page {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
}

.validator {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-16%);

  .validator-text {
    display: inline-block;
    margin-bottom: 10px;
  }
}

#components-layout-demo-top-side-2 .logo {
  display: flex;
  align-self: center;
  width: 100%;
  height: 100%;
}

.app-title,
.action {
  font-size: 24px;
  color: #fff;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-name {
  font-size: 28px;
}

.app-text {
  color: #000;
  padding-bottom: 24px;
}

.fetch-action {
  width: 20%;
  padding: 16px;
}

.fetch-action * {
  margin: 8px 0;
}

.app-name {
  font-size: 24px;
  color: #fff;
  text-overflow: ellipsis;
  margin-left: 12px;
}
</style>

