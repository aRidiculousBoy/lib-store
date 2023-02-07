<template>
  <div class="share-details-page">
    <a-layout id="components-layout-demo-top-side-2">
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
                <file v-for="file in useFileList" :key="file.shareName" v-bind="file" @transfer="handleTransfer"
                  @click="handleFileClick" @download="handleDownload" />
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
import { appTitle } from '@/constants'

import File from './components/file'
import FileSaver from './components/file-saver'

export default {
  name: 'share-details',
  components: {
    File,
    FileSaver
  },
  data() {
    return {
      list: [],
      loading: false,
      error: false,
      kenanJpg,
      appTitle
    }
  },
  methods: {
    getShareResource(value) {
      this.loading = true
      const payload = {
        type: 1,
        name: value
      }
      this.$store.dispatch('share/getShareResource', payload).then(response => {
        this.list = [response]
      }).catch(() => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    },
    handleTransfer(file) {
      this.$refs.fileSaverRef?.open(file)
    },
    handleFileClick(payload) {
      const { type, id } = payload
      if (type === 'folder') {

      } else {
        this.handlePreview(payload)
      }
    },
    handleDownload(file) {
      this.$store.dispatch('file/downloadShare', file)
    }
  },
  watch: {
    '$route.params.shareName': {
      immediate: true,
      handler(value) {
        this.getShareResource(value)
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
          extension: file.type === 1 ? '.mp4' : 'folder'
        }
      })
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
</style>

