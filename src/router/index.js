import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import configs from '@/configs'
import authorization from '@/utils/authorization'
import { appTitle } from '@/constants'
import { setPageTitle } from '@/utils/utils'

Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}



const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/'
})

router.beforeEach((to, from, next) => {
  const token = authorization.getToken()
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/',
        replace: true
      })
    } else {
      // 反之优先获取用户信息，再进行跳转 
      // 获取用户信息...
      next()
    }
  }
  // 未登录
  else {
    if (configs.whiteList.includes(to.path) || to.meta.notRequireLogin) {
      next()
    } 
    // 反之重定向到登录页面
    else {
      next('/login')
    }
  }

})

router.afterEach((to, from) => {
  setPageTitle(appTitle + ' - ' + to.meta.module)
})

export default router
