import request from '@/service'

const prefix = '/api'

const UserAPI = {
  LoginAPI: prefix + '/user/login',
  RegisterAPI: prefix + '/user/register',
  UserExistCheckAPI: prefix + '/user/register/n/',
  UploadAvatarAPI: prefix + '/user/profile/',
  GetUserInfoAPI: prefix + '/user/'
}

// 登录
export const appLoginRequest = (payload, isRemeber = false) => {
  return request.post({
    url: !isRemeber ? UserAPI.LoginAPI + '/0' : UserAPI.LoginAPI + '/1',
    data: payload
  })
}

// 注册
export const appRegisterRequest = (payload) => {
  return request.post({
    url: UserAPI.RegisterAPI,
    data: payload
  })
}

// 检查用户名是否存在
export const checkUserExistRequest = (payload) => {
  return request.get({
    url: UserAPI.UserExistCheckAPI + payload.userName
  })
}

// 上传用户头像
export const uploadUserAvatarRequest = (payload) => {
  const formData = new FormData()
  formData.append('file', payload.file)
  return request.post({
    url: UserAPI.UploadAvatarAPI,
    data: formData
  })
}

// 获取用户信息
export const getUserInfoRequest = (payload) => {
  return request.get({
    url: UserAPI.GetUserInfoAPI + payload.username
  })
}

export default {
  appLoginRequest,
  appRegisterRequest,
  checkUserExistRequest,
  uploadUserAvatarRequest,
  getUserInfoRequest
}