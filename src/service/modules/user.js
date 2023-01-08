import request from '@/service'

const USERAPI = {
  LOGINAPI: '/user/login'
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