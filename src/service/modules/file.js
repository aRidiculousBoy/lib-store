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
  CreateFolderAPI: prefix + '/user/resource/folder/'
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
  saveAs(FILEAPI.DownloadFileAPI + payload.id);
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
  debugger
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

export default {
  getUserFilesRequest,
  getFileProgressRequest,
  uploadChunkRequest,
  downloadFileRequest,
  renameFileRequest,
  renameFolderRequest,
  removeFileRequest,
  removeFolderRequest,
  createFolderRequest
}