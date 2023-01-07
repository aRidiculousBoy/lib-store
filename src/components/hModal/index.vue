<template>
  <div class="h-modal">
    <a-modal v-model="visible" :title="title" destroyOnClose>
      <form-model v-bind="formModelConfig" ref="formModelRef"></form-model>
      <template slot="footer" v-if="showFooter">
        <a-button key="back" @click="handleCancel">{{ cancelText }}</a-button>
        <a-button key="submit" type="primary" @click="handleConfirm">
          {{ confirmText }}
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import formModel from '@components/formModel'

export default {
  name: 'HModal',
  props: {
    title: {
      type: String
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    formModelConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const visible = false
    return {
      visible
    }
  },
  components: {
    formModel
  },
  methods: {
    showModal() {
      this.visible = true
    },
    closeModal() {
      this.visible = false
    },
    validate() {
      return this.$refs.formModelRef.validate()
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="less"></style>
