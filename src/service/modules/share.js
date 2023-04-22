import request from '@/service'

const prefix = '/api'

const ShareAPI = {
  GetShareAPI: prefix + '/user/resource/share/',
  UnShareAPI: prefix + '/user/resource/share/',
  GetDeepResourceAPI: prefix + '/user/resource/share/detail/',
  ValidateExpiresAPI: prefix + '/user/resource/file/expire/'
}

// 获取用户分享资源
export const getShareResourceRequest = (payload = {}) => {
  return request.get({
    url: ShareAPI.GetShareAPI,
    params: payload
  })
}

// 取消分享的资源
export const unShareRequest = (payload) => {
  return request.delete({
    url: ShareAPI.UnShareAPI + payload.shareName
  })
}

// 获取分享资源内层资源
export const getDeepResourceRequest = (payload) => {
  return request.get({
    url: ShareAPI.GetDeepResourceAPI + payload.id
  })
}

// 校验分享的资源是否过期
export const validateShareRequest = (payload) => {
  return request.get({
    url: ShareAPI.ValidateExpiresAPI + payload.shareName
  })
}


export default {
  getShareResourceRequest,
  unShareRequest,
  getDeepResourceRequest,
  validateShareRequest
}