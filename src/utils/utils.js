export function generateRoutes(routes) {
  let ret = []
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (route.meta) {
      ret.push(route)
    }
  }
  return ret
}

export function getRouteByPath(routes, path) {
  let i = 0
  let length = routes.length
  let target = {}
  while (i < length) {
    let route = routes[i]
    if (route.path === path || route.name === path) {
      target = generateRoutes(route)
      break
    } else if (route.children && route.children.length > 0) {
      route = getRouteByPath(route.children, path)
      if (route.path) {
        target = generateRoutes(route)
        break
      }
    }
    i++
  }
  return target
}

// 路由权限校验函数
export function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {  
    return true
  }
}
