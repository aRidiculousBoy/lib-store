<template>
  <a-dropdown placement="bottomCenter">
    <a-menu slot="overlay" @click="handleMenuClick">
      <a-menu-item key="file">
        <a-upload :showUploadList="false" :customRequest="handleUploadFile">
          <a-icon type="file-add" />上传文件
        </a-upload>
      </a-menu-item>
      <a-menu-item key="pictrue">
        <a-upload name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" accept=".jpg,.png,.jpeg,.gif"
          :showUploadList="false" :customRequest="handleUploadFile">
          <a-icon type="picture" />上传照片
        </a-upload>
      </a-menu-item>
      <a-menu-item key="doc">
        <a-upload name="file" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" accept=".doc,.docx,.xlsx,.ppt"
          :showUploadList="false" :customRequest="handleUploadFile">
          <a-icon type="file-excel" />上传文档
        </a-upload>
      </a-menu-item>
      <a-menu-item key="folder-add">
        <a-icon type="folder-add" />新建文件夹
      </a-menu-item>
    </a-menu>
    <a-button style="margin-left: 12px" type="primary"><a-icon type="plus" :customRequest="handleUploadFile" />
    </a-button>
  </a-dropdown>
</template>

<script>
export default {
  name: 'uploader',
  methods: {
    handleMenuClick({ key }) {
      if (key === 'folder-add') {
        this.$emit('createFolder')
      }
    },
    handleUploadFile({ file }) {
      this.$emit('uploadFile', file)
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-upload>* {
  padding: 6px 6px 6px 0;
}
</style>
