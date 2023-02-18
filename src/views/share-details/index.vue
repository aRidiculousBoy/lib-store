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
        <div class="view">
          <div class="logo" />
          <span class="app-title">{{ appTitle }}</span>
        </div>
        <a-avatar :src="kenanJpg" :size="44"></a-avatar>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px">
        <a-spin :spinning="loading">
          <div v-if="!error" class="content" style="display: flex;height: 96%">
            <a-card style="flex: 5">
              <div class="page-header">
                <span>面包屑</span>
                <a-button type="primary" @click="handleTransfer">全部保存到我的云盘</a-button>
              </div>
              <a-divider></a-divider>
              <div class="list">
                <a-row :gutter="[4, 16]" v-for="row in rowLength" :key="row">
                  <a-col :span="4" v-for="file in useFileList.slice((row - 1) * 6, row * 6)" :key="file.id">
                    <file v-bind="file" @transfer="handleTransfer" @click="handleFileClick"
                      @download="handleDownload" />
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
            <a-result title="您打开的链接有误，请检查链接准确性！">
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
        <file-saver ref="fileSaverRef" />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import kenanJpg from '@/assets/images/kenan.jpg'
import { ERROR_FETCH_TEXT } from '@/constants'
import { appTitle } from '@/constants'

import File from './components/file'
import FileSaver from './components/file-saver'

export default {
  name: 'share-details',
  components: {
    File,
    FileSaver
  },
  created() {
    console.log(this.$route.params)
  },
  data() {
    return {
      list: [],
      loading: false,
      error: false,
      fetchCode: undefined,
      fetching: false,
      kenanJpg,
      appTitle,
      fetchStatus: 0
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
        this.$store.dispatch('share/getDeepResource', payload).then(response => {
          this.list = this.clickParser(response)
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
        const shareName = this.$route.params.shareName
        const payload = {
          name: shareName,
          type: 1,
          fetchCode: this.fetchCode
        }
        this.$store.dispatch('share/getShareResource', payload).then(response => {
          if (response === ERROR_FETCH_TEXT) {
            this.$message.error('提取码错误')
          }
          else {
            this.fetchStatus = 1
            this.list = [response]
          }
        }).finally(() => {
          this.fetching = false
        })
      }
      else {
        this.$message.error('验证码不能为空')
      }
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
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
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
</style>

