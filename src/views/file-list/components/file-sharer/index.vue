<template>
  <div class="file-sharer">
    <a-modal v-model="visible" title="分享文件" :footer="null" :afterClose="handleAfterClose">
      <a-spin v-if="!success" :spinning="loading" tip="生成分享链接中...">
        <a-form-model :model="form" :rules="rules" ref="modelRef">
          <a-form-model-item label="Id">
            <a-input v-model="form.userResourceId" disabled />
          </a-form-model-item>
          <a-form-model-item label="文件名称">
            <a-input v-model="form.originalName" disabled />
          </a-form-model-item>
          <a-form-model-item label="提取码" prop="fetchCode">
            <a-input v-model="form.fetchCode" :maxLength="4" />
          </a-form-model-item>
          <a-form-model-item label="有效时间" prop="survivalTime">
            <a-radio-group v-model="form.survivalTime">
              <a-radio :value="1 | dayFilter">
                1天
              </a-radio>
              <a-radio :value="2 | dayFilter">
                7天
              </a-radio>
              <a-radio :value="30 | dayFilter">
                30天
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="handleCreateShare" :loading="loading">
              创建分享链接
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-spin>
      <a-result v-else title="文件已分享">
        <template #icon>
          <a-icon type="smile" theme="twoTone" />
        </template>
        <template #extra>
          <a-space>
            <a-button type="primary" v-copy="{ text: link, callback: copyCallback }">
              复制分享链接
            </a-button>
            <a-button @click="handleToSharePage">跳转到分享页</a-button>
          </a-space>

        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script>
import { copy } from '@/directives'

export default {
  name: 'file-sharer',
  data() {
    return {
      visible: false,
      callback: undefined,
      form: {
        fetchCode: undefined,
        survivalTime: 1 * 60 * 24,
        userResourceId: undefined,
        originalName: undefined,
        type: undefined
      },
      rules: {
        survivalTime: [
          {
            required: true,
            message: '请选择资源分享的有效期',
            trigger: 'change'
          }
        ],
        fetchCode: [
          {
            required: true,
            message: '请输入该资源提取码(4位)',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 4,
            message: '提取码长度为4位(固定值)'
          }
        ]
      },
      loading: false,
      success: false,
      link: undefined
    }
  },
  methods: {
    open(file, callback) {
      this.form.type = file.type === 'folder' ? 0 : 1
      this.form.originalName = file.name
      this.form.userResourceId = file.id

      this.callback = callback
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleCreateShare() {
      this.loading = true
      this.$refs.modelRef?.validate(valid => {
        if (valid) {
          this.$store.dispatch('file/createShare', this.form).then(response => {
            this.link = window.location.host + '/share-details/' + response
            this.callback && this.callback()
            this.loading = false
            this.success = true
          })
        }
      })
    },
    handleAfterClose() {
      this.success = false
      this.form.fetchCode = undefined
    },
    copyCallback() {
      this.$message.success('复制成功，快将该资源分享给你的小伙伴吧')
    },
    handleToSharePage() {
      this.$router.push('/share')
    }
  },
  filters: {
    dayFilter(day) {
      return day * 60 * 24
    }
  },
  directives: {
    copy
  }
}
</script>

<style scoped lang="less">

</style>
