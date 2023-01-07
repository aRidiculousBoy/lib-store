export const appMode = process.env.NODE_ENV

export const title = 'coderwyh-pro'

export const networkTimeout = 5000


const apiPaths = {
  development: 'https://ridiculous.usemock.com',
  test: 'https://www.bootcdn.com',
  production: 'https://facelook.com'
}

export const baseURL = apiPaths[appMode]

export default {
  appMode,
  apiPaths,
  baseURL,
  networkTimeout
}
