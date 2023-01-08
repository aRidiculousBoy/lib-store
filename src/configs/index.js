export const appMode = process.env.NODE_ENV

export const title = 'coderwyh-pro'

export const networkTimeout = 5000


const apiPaths = {
  development: '/api',
  test: 'https://www.bootcdn.com',
  production: '/api'
}

export const baseURL = apiPaths[appMode]

// 白名单列表
export const whiteList = ['/login']

export default {
  appMode,
  apiPaths,
  baseURL,
  networkTimeout,
  whiteList
}
