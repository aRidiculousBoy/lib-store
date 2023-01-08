import { constantRouterMap, asyncRouterMap } from '../../routes'
import { hasPermission } from '../../utils/utils'

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles } = data
        // 生成可访问的路由
        const accessedRouters = asyncRouterMap.filter((v) => {
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter((child) => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false
              })
              return v
            } else {
              return v
            }
          }
          return false
        })
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
