<template>
  <div class="form-model">
    <a-form-model ref="formModelRef" :model="formData" :rules="rules" :layout="layout" v-bind="formItemLayout">
      <a-form-model-item
        v-for="formItem in formItems"
        :label="formItem.label"
        :prop="formItem.prop"
        :key="formItem.prop"
        v-bind="formItem.attrs"
      >
        <!-- type为input的情况 -->
        <a-input
          v-if="formItem.type === 'input'"
          v-model="formData[formItem.prop]"
          v-bind="formItem.otherOptions"
        />
        <!-- type为textarea的情况 -->
        <a-textarea
          v-else-if="formItem.type === 'textarea'"
          v-model="formData[formItem.prop]"
          v-bind="formItem.otherOptions"
        />
        <!-- type为datepicker的情况 -->
        <a-date-picker
          v-else-if="formItem.type === 'datepicker'"
          v-model="formData[formItem.prop]"
          show-time
          type="date"
          style="width: 100%"
          v-bind="formItem.otherOptions"
        />
        <!-- type为select的情况 -->
        <a-select
          v-else-if="formItem.type === 'select'"
          v-model="formData[formItem.prop]"
          v-bind="formData.otherOptions"
        >
          <a-select-option v-for="option in formItem.options" :value="option.value">{{
            option.label
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <slot name="action"></slot>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'formModel',
  props: {
    // 表单域整体的布局方式 有水平 行内 垂直三种方式
    layout: {
      default: 'horizontal',
      type: String,
      validator(value) {
        if (!['horizontal', 'vertical', 'inline'].includes(value)) {
          return 'layout value must in ["horizontal","vertical","inline"]'
        }
        return value
      }
    },

    // 表单项
    formItems: {
      required: true,
      type: Array
    },
    // 绑定的对象
    formData: {
      required: true,
      type: Object
    },
    // 校验规则
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    async validate() {
      let isValid
      const res = await this.$refs.formModelRef.validate((valid) => {
        isValid = valid
      })
      return isValid
    },
    reset() {
      this.$refs.formModelRef.resetFields()
    }
  },
  computed: {
    formItemLayout() {
      const layout = this.layout
      return layout === 'horizontal'
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
          }
        : {}
    }
  }
}
</script>

<style scoped lang="less"></style>
