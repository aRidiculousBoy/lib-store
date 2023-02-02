<template>
  <div class="create-folder-modal">
    <a-modal v-model="visible" title="新建文件夹"
      :bodyStyle="{ display: 'flex', 'justify-content': 'center', 'flex-wrap': 'wrap' }" okText="确定" cancelText="取消"
      @ok="handleCreateFolder">
      <div class="folder-cover">
        <img :src="folderSvg" />
      </div>
      <a-input v-model="name" ref="inputRef"></a-input>
    </a-modal>
  </div>
</template>

<script>
import folderSvg from '@/assets/svg/folder.svg'

export default {
  name: 'create-folder',
  data() {
    return {
      visible: false,
      callback: undefined,
      name: undefined,
      folderSvg
    }
  },
  methods: {
    open(callback) {
      this.visible = true
      this.name = undefined
      this.$nextTick(() => {
        this.$refs.inputRef?.focus()
      })
      this.callback = callback
    },
    close() {
      this.visible = false
    },
    handleCreateFolder() {
      const payload = {
        folderName: this.name,
        parentId: this.$route.params.parentId
      }
      this.$store.dispatch('file/createFolder', payload).then((response) => {
        this.callback && this.callback()
        this.close()
      })
    }
  }
}
</script>

<style scoped lang="less">
.folder-cover {
  width: 144px;
  padding: 12px;
  padding-top: 0;

  img {
    width: 100%;
  }
}
</style>
