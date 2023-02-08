<template>
  <div class="file-co-sharer">
    <a-modal v-model="visible" title="分享文件" :footer="null" :zIndex="9999">
        <a-form-model :model="form" :rules="rules" ref="modelRef">
          <a-form-model-item label="分享名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入分享名称" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="分享说明" prop="intro">
            <a-textarea v-model="form.intro" placeholder="请输入分享说明(可选)" :auto-size="{ minRows: 4 }" allow-clear />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="handleCreateCoShare" :loading="loading">
              共享
            </a-button>
          </a-form-model-item>
        </a-form-model>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'file-co-sharer',
  data() {
    return {
      visible: false,
      callback: undefined,
      form: {
        id: undefined,
        type: undefined,
        intro: undefined,
        name: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入分享名称',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    open(file, callback) {
      this.form.type = file.type
      this.form.id = file.id
      this.callback = callback
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleCreateCoShare() {
      const payload = this.form
      this.$store.dispatch('file/createCoShare', payload).then(response => {
        console.log(response)
      }).finally(() => {
        this.loading = false
        this.close()
      })
    },
  }
}
</script>