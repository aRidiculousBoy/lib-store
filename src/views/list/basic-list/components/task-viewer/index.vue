<template>
  <a-modal :title="title" v-model="visible" @ok="handleOk" @cancel="handleCancel" cancelText="取消" okText="确定"
    :afterClose="handleAfterClose">
    <a-form-model ref="formModelRef" :model="form" :layout="form.layout" v-bind="formItemLayout" :rules="form.rules">
      <a-form-model-item label="任务名称" prop="taskName">
        <a-input v-model="form.taskName" placeholder="请输入任务名称" allowClear />
      </a-form-model-item>
      <a-form-model-item label="开始时间" prop="startTime">
        <a-date-picker v-model="form.startTime" format="yyyy-MM-DD" placeholder="请选择任务开始时间" />
      </a-form-model-item>
      <a-form-model-item label="负责人" prop="responseUser">
        <a-input v-model="form.responseUser" placeholder="请输入负责人" allowClear />
      </a-form-model-item>
      <a-form-model-item label="任务描述" prop="taskDesc">
        <a-textarea type="textarea" :maxLength="200" v-model="form.taskDesc" placeholder="请输入任务描述" allowClear />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import 'moment/locale/zh-cn';

export default {
  name: 'task-viewer',
  props: {
    mode: {
      type: String,
      validator(value) {
        if (!['edit', 'add'].includes(value)) {
          return new Error('value must be one of ["add","edit"]')
        }
        return value
      },
      required: true
    },
    callback: {
      required: true
    } 
  },
  data() {
    return {
      visible: false,
      form: {
        taskName: undefined,
        startTime: undefined,
        taskDesc: undefined,
        responseUser: undefined,
        layout: 'horizontal',
        rules: {
          taskName: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入任务名称'
            }
          ],
          startTime: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入开始时间'
            }
          ],
          responseUser: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入负责人'
            }
          ]
        }
      }
    }
  },
  methods: {
    handleOk() {
      this.$refs.formModelRef?.validate(valid => {
        if (valid) {
          // 发请求
          // 回调
          this.close()
          this.callback()
        } else {
          // notice
        }
      })
    },
    handleCancel() { },
    open(task) {
      if (task) {
        this.form.taskName = task.name
        this.form.taskDesc = task.desc
        this.form.startTime = task.startTime
        this.form.responseUser = task.responseUser
      }
      this.visible = true
    },
    close() {
      this.visible = false
    },
    handleAfterClose() {
      this.form.taskName = undefined
      this.form.startTime = undefined
      this.form.taskDesc = undefined
      this.form.responseUser = undefined
    }
  },
  computed: {
    title() {
      return this.mode === 'add' ? '新增任务' : '编辑任务'
    },
    formItemLayout() {
      const { layout } = this.form;
      return layout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
        }
        : {};
    }
  }
}
</script>

<style scoped lang="less">

</style>
