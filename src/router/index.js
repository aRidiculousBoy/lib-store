import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import configs from '@/configs'
import authorization from '@/utils/authorization'

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
    debugger
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
    debugger
    if (configs.whiteList.includes(to.path)) {
      next()
    } 
    // 反之重定向到登录页面
    else {
      next('/login')
    }
  }

})
export default router
