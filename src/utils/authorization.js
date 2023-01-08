const TOKEN_KEY = 'token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export default {
  getToken,
  removeToken
}