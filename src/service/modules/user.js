import request from '@/service'

const prefix = '/api'

const USERAPI = {
  LOGINAPI: prefix + '/user/login'
}

export const appLoginRequest = (payload, isRemeber = false) => {
  return request.post({
    url: !isRemeber ? USERAPI.LOGINAPI + '/0' : USERAPI.LOGINAPI + '/1',
    data: payload
  })
}

export default {
  appLoginRequest
}