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


// 生成uuid
export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}


// 设置网页标题
export function setPageTitle(title) {
  document.title = title
}