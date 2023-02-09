<template>
  <div class="file-co-sharer">
    <a-modal v-model="visible" title="共享文件" :footer="null" :zIndex="9999">
      <a-form-model :model="form" :rules="rules" ref="modelRef">
        <a-form-model-item label="共享名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入共享名称" allow-clear />
        </a-form-model-item>
        <a-form-model-item label="共享描述" prop="intro">
          <a-textarea v-model="form.intro" placeholder="请输入共享描述(可选)" :auto-size="{ minRows: 4 }" allow-clear />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" @click="handleCreateCoShare">
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
      name: undefined
    }
  },
  methods: {
    open(file, callback) {
      this.form.type = file.type
      this.form.id = file.id
      this.name = file.name
      this.callback = callback
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleCreateCoShare() {
      this.close()
      const key = 'co-share'
      const name = this.name
      this.$message.loading({ content: `${name} - 创建共享中...`, key })
      const payload = this.form
      this.$store.dispatch('file/createCoShare', payload).then(response => {
        this.$message.success({ content: '创建成功', key, duration: 2 });
      }).finally(() => {
        this.close()
      })
    },
  }
}
</script>