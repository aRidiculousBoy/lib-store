import shareService from '@/service/modules/share'

const shareStore = {
  namespaced: true,
  state: {},
  actions: {
    async getShareResource(context, payload) {
      const response = await shareService.getShareResourceRequest(payload)
      return response
    }
  }
}

export default shareStore