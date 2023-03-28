import fileService from '@service/modules/file'

const file = {
  namespaced: true,
  state: {
  },
  actions: {
    async getUserFile(context, payload) {
      const response = await fileService.getUserFilesRequest(payload)
      return response
    },
    async getFileProgress(context, payload) {
      const response = await fileService.getFileProgressRequest(payload)
      return response
    },
    async uploadChunk(context, payload) {
      const response = await fileService.uploadChunkRequest(payload)
      return response
    },
    async downloadFile(context, payload) {
      const response = await fileService.downloadFileRequest(payload)
    },
    async renameFile(context, payload) {
      const response = await fileService.renameFileRequest(payload)
      return response
    },
    async renameFolder(context, payload) {
      const response = fileService.renameFolderRequest(payload)
      return response
    },
    async removeFile(context, payload) {
      const response = await fileService.removeFileRequest(payload)
      return response
    },
    async removeFolder(context, payload) {
      const response = fileService.removeFolderRequest(payload)
      return response
    },
    async createFolder(context, payload) {
      const response = await fileService.createFolderRequest(payload)
      return response
    },
    async cancelUpload(context, payload) {
      const response = await fileService.cancelUploadRequest(payload)
      return response
    },
    async recoverFile(context, payload) {
      const response = await fileService.recoverFileRequest(payload)
      return response
    },
    async recoverFolder(context, payload) {
      const response = await fileService.recoverFolderRequest(payload)
      return response
    },
    async createShare(context, payload) {
      const response = await fileService.createShareRequest(payload)
      return response
    },
    async getFolderPath(context, payload) {
      const response = await fileService.getFolderPathRequest(payload)
      return response
    },
    async transferFile(context, payload) {
      const response = await fileService.transferFileRequest(payload)
      return response
    },
    async downloadShare(context, payload) {
      const response = await fileService.downloadShareRequest(payload)
      return response
    },
    async createCoShare(context, payload) {
      const response = await fileService.createCoShareRequest(payload)
      return response
    },
    async getOwnPublic(context, payload) {
      const response = await fileService.getOwnPublicRequest(payload)
      return response
    },
    async getPublicShare(context, payload) {
      const response = await fileService.getPublicShareRequest(payload)
      return response
    },
    async getSubscribe(context, payload) {
      const response = await fileService.getSubscribeRequest(payload)
      return response
    },
    async subscribe(context, payload) {
      const response = await fileService.subscribeRequest(payload)
      return response
    },
    async unSubscribe(context, payload) {
      const response = await fileService.unSubscribeRequest(payload)
      return response
    },
    async transferPublic(context, payload) {
      const response = await fileService.transferPublicRequest(payload)
      return response
    },
    async unCoShare(context, payload) {
      const response = await fileService.unCoShareRequest(payload)
      return response
    },
    async getFolderStatus(context, payload) {
      const response = await fileService.getFolderStatusRequest(payload)
      return response
    },
    async getVideoLocation(context, payload) {
      const response = await fileService.getVideoLocationRequest(payload)
      return response
    },
    async collect(context, payload) {
      const response = await fileService.collectRequest(payload)
      return response
    },
    async getCollectList(context, payload) {
      const response = await fileService.getCollectListRequest(payload)
      return response
    },
    async unCollect(context, payload) {
      const response = await fileService.unCollectRequest(payload)
      return response
    }
  }
}

export default file
