import request from '../index'

const prefix = '/api'

const BinAPI = {
  GetBinFileAPI: prefix + '/user/resource/recycle'
}

export const getBinFileRequest = () => {
  return request.get({
    url: BinAPI.GetBinFileAPI
  })
}

export default {
  getBinFileRequest
}