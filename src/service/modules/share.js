import request from '@/service'

const prefix = '/api'

const ShareAPI = {
  GetShareAPI: prefix + '/user/resource/share/',
  UnShareAPI: prefix + '/user/resource/share/',
  GetDeepResourceAPI: prefix + '/user/resource/share/detail/'
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

export const getDeepResourceRequest = (payload) => {
  return request.get({
    url: ShareAPI.GetDeepResourceAPI + payload.id
  })
}

export default {
  getShareResourceRequest,
  unShareRequest,
  getDeepResourceRequest
}