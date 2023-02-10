<template>
  <div class="fullscreen" ref="fullScreenRef">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'full-screen',
  model: {
    prop: 'value',
    event: 'fullscreen'
  },
  props: {
    value: {
      type: Boolean,
      defalut: false
    }
  },
  mounted() {
    const listener = document.addEventListener('fullscreenchange', () => {
      this.$emit('change', this.value)
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
        document.exitFullscreen()
      }
    }
  }
}
</script>

<style>
.fullscreen:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
