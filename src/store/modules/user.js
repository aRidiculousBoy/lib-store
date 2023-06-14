import userService from '@service/modules/user'

const user = {
  namespaced: true,
  state: {
    token: undefined,
    roles: [],
    username: undefined,
    avatar: undefined,
    intro: undefined
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setUsername(state, username) {
      state.username = username
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setAvatar(state, avatar) {
      state.avatar = avatar ? 'data:image/*;base64,' + avatar : undefined
    },
    setIntro(state, intro) {
      state.intro = intro
     },
    clearToken(state) {
      state.token = undefined
      localStorage.removeItem('token')
    }
  },
  actions: {
    async appLogin(context, payload) {
      const response = await userService.appLoginRequest({
        userName: payload.username,
        password: payload.password
      }, false)
      context.commit('setUsername', response.userName)
      context.commit('setToken', response.token)

      return response
    },
    async appLogout(context, payload) {
      context.commit('clearToken')
    },
    async appRegister(context, payload) {
      const response = await userService.appRegisterRequest(payload)
      return response
    },
    async checkUserIsExist(context, payload) {
      const response = await userService.checkUserExistRequest(payload)
      return response
    },
    async uploadUserAvatar(context, payload) {
      const response = await userService.uploadUserAvatarRequest(payload)
      return response
    },
    async getUserInfo(context, payload) {
      const response = await userService.getUserInfoRequest(payload)
      context.commit('setUsername', response.userName)
      context.commit('setAvatar', response.profile)
      context.commit('setIntro', response.intro)
      return response
    }
  }
}

export default user
