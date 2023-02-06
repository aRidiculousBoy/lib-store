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
  }
}

export default file
