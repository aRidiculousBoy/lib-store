export const copy = {
  inserted(el, binding) {
    const callback = binding.value.callback
    el.$value = binding.value.text
    el.title = '复制'
    el.$handler = (e) => {
      if (!el.$value) {
        return false
      }
      const textarea = document.createElement('textarea')
      textarea.readonly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el.$value
      document.body.appendChild(textarea)
      textarea.select()
      const text = document.execCommand('Copy')
      if (text) {
        document.body.removeChild(textarea)
        callback && callback()
      }
    }
    el.addEventListener('click', el.$handler)
  },
  unbind(el) {
    el.removeEventListener('click', el.$handler)
  },
  componentUpdated(el,binding) {
    el.$value = binding.value.text
  }
}

export default {
  copy
}