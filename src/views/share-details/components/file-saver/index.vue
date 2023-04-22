<template>
  <div class="file-saver">
    <a-modal v-model="visible" title="保存到">
      <file-breadcrumb :items="routeStack" separator=">" :prefix="{ id: 0, name: '文件' }" :clickFn="handleBreadcrumbClick"
        class="breadcrumb" />
      <a-spin :spinning="loading" tip="加载中">
        <div class="create-folder" v-show="showCreateFolder">
          <a-input class="create-folder-input" v-model="folderName" ref="createFolderRef"></a-input>
          <a-space style="margin-right: 4px">
            <a-tooltip>
              <template slot="title">
                取消
              </template>
              <a-icon type="close-circle" class="action-icon" @click="closeCreateFolder" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                保存
              </template>
              <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" class="action-icon"
                @click="handleCreateFolder" />
            </a-tooltip>
          </a-space>
        </div>
        <div v-if="fileList.length" class="file-list">
          <div :class="[file.type === 'folder' ? 'save-item' : 'disable']" v-for="file in fileList" :key="file.id"
            @click="handleFileClick(file)">
            <img :src="typeMapper[file.extension] || typeMapper.fallback" class="file-cover">
            <div class="file-name">{{ file.name }}</div>
          </div>
        </div>
        <a-empty v-else :image="simpleImage" description="空文件夹" />
      </a-spin>
      <template slot="footer">
        <a @click="openCreateFolder">新建文件夹</a>
        <a-space>
          <a-button @click="close">
            取消
          </a-button>
          <a-button type="primary" :loading="submitting" @click="handleTransfer">
            {{ isRoot ? '保存到根目录' : '保存到此处' }}
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue';
import FileBreadcrumb from '@views/file-list/components/breadcrumb'

export default {
  name: 'file-saver',
  inject: ['typeMapper'],
  components: {
    FileBreadcrumb
  },
  data() {
    return {
      visible: false,
      loading: false,
      submitting: false,
      files: [],
      folders: [],
      parentId: 0,
      parentName: undefined,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      routeStack: [],
      showCreateFolder: true,
      folderName: undefined,
      file: undefined
    }
  },
  created() {
    this.getData(0)
  },
  methods: {
    getData(parentId) {
      this.loading = true
      this.showCreateFolder = false
      this.parentId = parentId
      const payload = {
        parentId
      }
      this.getFolderPath()
      this.$store.dispatch('file/getUserFile', payload).then(response => {
        this.files = response.resources
        this.folders = response.folders
        this.loading = false
      })
    },
    open(file) {
      if (file.shareName) {
        this.file = file
      }
      this.visible = true
    },
    close() {
      this.visible = false
      this.showCreateFolder = false
    },
    openCreateFolder() {
      this.folderName = undefined
      this.showCreateFolder = true
      this.$nextTick(() => {
        this.$refs.createFolderRef?.focus()
      })
    },
    closeCreateFolder() {
      this.showCreateFolder = false
    },
    getFolderPath() {
      const parentId = this.parentId
      const payload = {
        parentId
      }
      // 特殊情况处理 根文件夹 需要触发面包屑导航的更新
      if (parentId == '0') {
        this.routeStack = []
      }
      else {
        this.$store.dispatch('file/getFolderPath', payload).then(response => {
          this.processRelations(response)
        })
      }
    },
    // 对文件夹返回的路径关系进行解析
    processRelations(relation) {
      const stack = []
      let bottomLevel = relation
      while (bottomLevel) {
        const el = {
          name: bottomLevel.name,
          id: bottomLevel.id
        }
        stack.unshift(el)
        bottomLevel = bottomLevel.parent
      }
      this.routeStack = stack
    },
    handleBreadcrumbClick(item) {
      this.getData(item.id)
    },
    handleCreateFolder() {
      const isValid = this.folderName !== undefined && this.folderName?.trim() !== ''
      if (!isValid) {
        return this.$message.error('文件夹名称不能为空')
      }
      else {
        const payload = {
          folderName: this.folderName,
          parentId: this.parentId
        }
        this.$store.dispatch('file/createFolder', payload).then((response) => {
          this.getData(this.parentId)
        })
      }
    },
    handleFileClick(file) {
      const { type, id } = file
      if (type === 'folder') {
        console.log(11)
        this.parentName = file.name
        this.getData(id)
      }
    },
    handleTransfer() {
      // 单个资源保存
      if (this.file) {
        this.submitting = true
        const { shareName } = this.file
        const { parentId, parentName } = this
        const payload = {
          shareName,
          parentId
        }
        this.$store.dispatch('file/transferFile', payload).then(response => {
          this.$notification.success({
            message: '文件保存成功',
            description: h => {
              return h('div', null, [
                h('span', {
                }, `已保存到-`),
                h('a', {
                  attrs: {
                    href: `/file-list/${parentId}`
                  }
                }, parentName)
              ])
            }
          })
        }).finally(() => {
          this.close()
          this.submitting = false
        })
      }
      // 保存全部
      else {

      }
    }
  },
  computed: {
    fileList() {
      this.files.forEach((file) => {
        file.name = file.fileName
        file.type = 'file'
        file.size = file.fileSize
        file.extension = file.fileType

        delete file.fileName
        delete file.fileSize
        delete file.fileType
      })
      this.folders.forEach((folder) => {
        folder.id = folder.folderId
        folder.name = folder.folderName
        folder.extension = 'folder'
        folder.type = 'folder'
        delete folder.folderId
        delete folder.folderName
      })

      return [...this.folders, ...this.files]
    },
    isRoot() {
      return this.parentId === 0
    }
  },
  watch: {
    visible(value) {
      if (!value) {
        this.showCreateFolder = false
      }
      else {
        this.getData(this.parentId)
      }
    }
  }
}
</script>

<style scoped  lang="less">
/deep/ .ant-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/ .ant-modal-body {
  padding: 16px;
}

.save-item {
  display: flex;
  width: 100%;
  padding: 12px 0 12px 4px;
  overflow: hidden;

  &:hover {
    border-radius: 6px;
    background-color: #08ebe4f5;
    cursor: pointer;
  }
}

.breadcrumb {
  font-weight: 700;
  margin-bottom: 8px;
}

.file-cover {
  height: 24px;
  margin-right: 8px;
}

.file-name {
  width: 96%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.create-folder {
  display: flex;
  align-items: center;
  padding: 12px 0 12px 4px;

  &:hover {
    border-radius: 6px;
    background-color: #08ebe4f5;
    cursor: pointer;
  }

  .create-folder-input {
    flex: 1;
    margin-right: 12px;
  }

  .action-icon {
    font-size: 24px;

    &:hover {
      cursor: pointer;
    }
  }
}

.disable {
  display: flex;
  width: 100%;
  padding: 12px 0 12px 4px;
  overflow: hidden;

  &:hover {
    cursor: not-allowed;
  }

  opacity: 0.4;
}

/deep/ .ant-modal-body {
  max-height: 480px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e9e9e9e9;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }
}
</style>
