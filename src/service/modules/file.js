import request from '../index'
import { saveAs } from 'file-saver'

const prefix = '/api'

const FILEAPI = {
  GetFileAPI: prefix + '/user/resource/',
  GetFileProgressAPI: prefix + '/user/resource/file/progress/',
  UploadChunkAPI: prefix + '/user/resource/file/slice/',
  DownloadFileAPI: prefix + '/user/resource/file/',
  SetFileNameAPI: prefix + '/user/resource/file/',
  SetFolderNameAPI: prefix + '/user/resource/folder/',
  RemoveFileAPI: prefix + '/user/resource/file/',
  RemoveFolderAPI: prefix + '/user/resource/folder/',
  CreateFolderAPI: prefix + '/user/resource/folder/',
  CancelUploadAPI: prefix + '/user/undo/resource/',
  RecoverFileAPI: prefix + '/user/resource/file/rc/',
  RecoverFolderAPI: prefix + '/user/resource/folder/rc/',
  CreateShareAPI: prefix + '/user/resource/share/',
  GetFolderPathAPI: prefix + '/user/resource/location/',
  TransferAPI: prefix + '/user/resource/share/transfer/',
  DownloadShareAPI: prefix + '/user/resource/file/s/',
  CreateCoShareAPI: prefix + '/user/resource/shared/',
  GetOwnPublicAPI: prefix + '/user/resource/shared/',
  GetPublicShareAPI: prefix + '/user/resource/shared/public/',
  GetSubscribeAPI: prefix + '/user/resource/sub/',
  SubscribeAPI: prefix + '/user/resource/shared/public/sub/',
  UnSubScribeAPI: prefix + '/user/resource/shared/',
  TransferPublicAPI: prefix + '/user/resource/shared/public/transfer/',
  UnCoShareAPI: prefix + '/user/resource/shared/'
}

// 获取用户文件列表
export const getUserFilesRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetFileAPI + payload.parentId
  })
}

// 获取文件进度
export const getFileProgressRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetFileProgressAPI + payload.hash
  })
}

// 分片上传
export const uploadChunkRequest = (payload) => {
  return request.post({
    url: FILEAPI.UploadChunkAPI,
    timeout: Infinity,
    data: payload.formData,
    cancelToken: payload.cancelToken
  })
}

// 文件下载
export const downloadFileRequest = (payload) => {
  saveAs(FILEAPI.DownloadFileAPI + `${payload.type === 'folder' ? 0 : 1}/${payload.id}`, payload.name);
}

// 文件重命名
export const renameFileRequest = (payload) => {
  return request.put({
    url: FILEAPI.SetFileNameAPI + payload.resourceId,
    data: {
      originalName: payload.originalName,
      parentId: payload.parentId
    }
  })
}

// 文件夹重命名
export const renameFolderRequest = (payload) => {
  return request.put({
    url: FILEAPI.SetFolderNameAPI + payload.id,
    data: {
      folderName: payload.name,
      parentId: payload.parentId
    }
  })
}

// 删除文件
export const removeFileRequest = (payload) => {
  return request.delete({
    url: FILEAPI.RemoveFileAPI + payload.id + `/${payload.isPhysical ? 1 : 0}`
  })
}

// 删除文件夹
export const removeFolderRequest = (payload) => {
  return request.delete({
    url: FILEAPI.RemoveFolderAPI + payload.id + `/${payload.isPhysical ? 1 : 0}`
  })
}

// 新建文件夹
export const createFolderRequest = (payload) => {
  const formData = new FormData()
  formData.append('folderName', payload.folderName)
  return request.post({
    url: FILEAPI.CreateFolderAPI + payload.parentId,
    data: formData
  })
}

// 取消文件上传
export const cancelUploadRequest = (payload) => {
  return request.delete({
    url: FILEAPI.CancelUploadAPI + payload.fileId
  })
}

// 恢复回收站文件
export const recoverFileRequest = (payload) => {
  return request.put({
    url: FILEAPI.RecoverFileAPI + payload.id
  })
}

// 恢复回收站文件夹
export const recoverFolderRequest = (payload) => {
  return request.put({
    url: FILEAPI.RecoverFolderAPI + payload.id
  })
}

// 创建分享资源
export const createShareRequest = (payload) => {
  return request.post({
    url: FILEAPI.CreateShareAPI,
    data: payload
  })
}

// 获取文件夹路径
export const getFolderPathRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetFolderPathAPI + payload.parentId
  })
}

// 资源转存
export const transferFileRequest = (payload) => {
  return request.post({
    url: FILEAPI.TransferAPI + payload.shareName,
    params: {
      parentId: payload.parentId
    }
  })
}

// 共享资源下载
export const downloadShareRequest = (payload) => {
  saveAs(FILEAPI.DownloadShareAPI + payload.shareName)
}

// 创建共享资源
export const createCoShareRequest = (payload) => {
  return request.post({
    url: FILEAPI.CreateCoShareAPI,
    data: {
      userResourceId: payload.id,
      type: payload.type === 'folder' ? 0 : 1,
      intro: payload.intro,
      name: payload.name
    }
  })
}

// 我的共享资源
export const getOwnPublicRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetOwnPublicAPI
  })
}

// 获取所有的共享文件
export const getPublicShareRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetPublicShareAPI,
    params: {
      name: payload.name,
      page: payload.pageNum,
      size: payload.pageSize
    }
  })
}

// 获取订阅列表
export const getSubscribeRequest = (payload) => {
  return request.get({
    url: FILEAPI.GetSubscribeAPI
  })
}

// 添加订阅
export const subscribeRequest = (payload) => {
  return request.post({
    url: FILEAPI.SubscribeAPI,
    data: {
      id: payload.id
    }
  })
}

// 取消订阅
export const unSubscribeRequest = (payload) => {
  return request.delete({
    url: FILEAPI.UnSubScribeAPI + payload.id
  })
}

// 转存共享资源
export const transferPublicRequest = (payload) => {
  return request.post({
    url: FILEAPI.TransferPublicAPI,
    data: {
      id: payload.id,
      parentId: payload.parentId
    }
  })
}


// 取消共享资源
export const unCoShareRequest = (payload) => {
  return request.delete({
    url: FILEAPI.UnCoShareAPI + payload.id
  })
}

export default {
  getUserFilesRequest,
  getFileProgressRequest,
  uploadChunkRequest,
  downloadFileRequest,
  renameFileRequest,
  renameFolderRequest,
  removeFileRequest,
  removeFolderRequest,
  createFolderRequest,
  cancelUploadRequest,
  recoverFileRequest,
  recoverFolderRequest,
  createShareRequest,
  getFolderPathRequest,
  transferFileRequest,
  downloadShareRequest,
  createCoShareRequest,
  getOwnPublicRequest,
  getPublicShareRequest,
  getSubscribeRequest,
  subscribeRequest,
  unSubscribeRequest,
  transferPublicRequest,
  unCoShareRequest
}