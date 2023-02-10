<template>
  <div class="fullscreen" ref="fullScreenRef">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'fullscreen',
  model: {
    prop: 'value'
  },
  props: {
    value: {
      type: Boolean,
      defalut: false
    }
  },
  mounted() {
    const listener = document.addEventListener('fullscreenchange', (event) => {
      this.$emit('change', this.value, event)
    })
    this.$on('hook:destroyed', () => {
      document.removeEventListener('fullscreenchange', listener)
    })
  },
  watch: {
    value(value) {
      if (value) {
        this.$refs.fullScreenRef?.requestFullscreen()
      }
      else {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }
      }
    }
  }
}
</script>

<style>
.fullscreen:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
</style>
