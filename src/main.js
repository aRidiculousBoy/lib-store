import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@assets/css/base.css'
import ContextMenu from 'vue-contextmenujs'
import 'animate.css'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// 关闭生产提示
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(ContextMenu)
Vue.use(VueViewer)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
