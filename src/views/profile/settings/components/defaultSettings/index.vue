<template>
  <div class="default-settings">
    <h3 class="title">基本设置</h3>
    <div class="content">
      <div class="form-content">
        <a-form-model :model="formData" layout="vertical" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
          <a-form-model-item v-for="formItem in formItems" :label="formItem.label" :key="formItem.bindingProp"
            :wrapper-col="formItem.wrapperCol">
            <a-input v-if="formItem.type === 'input'" v-model="formData[formItem.bindingProp]" />
            <a-textarea v-else-if="formItem.type === 'textarea'" v-model="formData[formItem.bindingProp]"
              :key="formItem.bindingProp" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14 }">
            <a-button type="primary">保存</a-button>
            <a-button style="margin-left: 10px">取消</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="upload-content">
        <a-avatar :src="kenan" :size="96" />
        <div style="margin-top: 18px">
          <a-button icon="cloud-upload" @click="handleUpdateAvatar">更换头像</a-button>
        </div>
      </div>
    </div>
    <avatar-editor ref="avatarEditorRef"/>
  </div>
</template>

<script>
import kenan from '@assets/images/kenan.jpg'
import AvatarEditor from './components/avatar-editor'

export default {
  name: 'DefaultSetting',
  components: {
    AvatarEditor
  },
  data() {
    const formData = {
      name: 'a Ridiculous Boy',
      tel: '66666666666',
      email: 'example@example.com',
      intro: '躺平'
    }
    const formItems = [
      {
        label: '昵称',
        type: 'input',
        bindingProp: 'name',
        wrapperCol: {
          span: 12
        }
      },
      {
        label: '联系电话',
        type: 'input',
        bindingProp: 'tel',
        wrapperCol: {
          span: 12
        }
      },
      {
        label: '邮箱地址',
        type: 'input',
        bindingProp: 'email',
        wrapperCol: {
          span: 12
        }
      },
      {
        label: '个人简介',
        type: 'textarea',
        bindingProp: 'intro',
        wrapperCol: {
          span: 18
        }
      }
    ]
    return {
      formData,
      formItems,
      kenan
    }
  },
  methods: {
    handleUpdateAvatar() {
      this.$refs.avatarEditorRef?.open()
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 20px;
}

.content {
  display: flex;

  .form-content {
    flex: 1;
  }

  .upload-content {
    text-align: center;
    padding: 0 72px;
    border-left: 1px solid #e8e8e8;
  }
}
</style>
