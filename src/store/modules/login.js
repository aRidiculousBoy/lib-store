import axios from 'axios'
const login = {
  namespaced: true,
  state: {
    token: 'coderwyh-pro',
    roles: []
  },
  mutations: {
    SET_ROLES(state,roles) {
      state.roles = roles
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      const res = await axios.get('https://ridiculous.usemock.com/user')
      if (res.data.code === 200) {
        commit('SET_ROLES',res.data.data.roles)
      }
      return Promise.resolve(res.data.data)
    }
  }
}

export default login
