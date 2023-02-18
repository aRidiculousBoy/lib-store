import shareService from '@/service/modules/share'

const shareStore = {
  namespaced: true,
  state: {},
  actions: {
    async getShareResource(context, payload) {
      const response = await shareService.getShareResourceRequest(payload)
      return response
    },
    async unShareResource(context, payload) {
      const response = await shareService.unShareRequest(payload)
      return response
    },
    async unShareResourceBatch(context, payload) {
      const tasks = payload.shareNames.map(shareName => {
        const parameters = {
          shareName
        }
        return context.dispatch('unShareResource', parameters)
      })
      return await Promise.all(tasks)
    },
    async getDeepResource(context, payload) {
      const response = await shareService.getDeepResourceRequest(payload)
      return response
    }
  }
}

export default shareStore