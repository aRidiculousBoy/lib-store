import request from '@/service'

const prefix = '/api'

const ShareAPI = {
  GetShareAPI: prefix + '/user/resource/share/'
}

export const getShareResourceRequest = (payload = {}) => {
  return request.get({
    url: ShareAPI.GetShareAPI,
    params: payload
  })
}


export default {
  getShareResourceRequest
}