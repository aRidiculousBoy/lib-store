import binService from '@/service/modules/bin'

const bin = {
  namespaced: true,
  state: {},
  actions: {
    async getBinFile(context, payload) {
      const response = binService.getBinFileRequest()
      return response
    }
  },
  mutations: {}
}

export default bin