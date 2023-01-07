import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'

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
  if (store.state.login.token) { // 如果存有token
    // 进入登录页后直接跳转至系统内
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      // 否则
      if (!store.state.login.roles.length) {
        store.dispatch('login/getUserInfo').then((res) => {
          const roles = res.roles
          store
            .dispatch('permission/generateRoutes', { roles })
            .then(() => {
              store.state.permission.addRouters.forEach((route) => {
                router.addRoute(route)
              })

              next({ ...to, replace: true })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      } else {
        next()
      }
    }
  } else {
    next('/login')
  }
})
export default router
