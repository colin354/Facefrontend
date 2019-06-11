import request from '@/plugin/axios'

/**
 * @description [ sys ] 登陆注销相关
 */
export const sysAccountService = {
  /**
   * 登录
   */
  login (data) {
    return request({
      url: 'http://localhost:8000/api/user/login',
      // url: 'http://192.17.1.150:8000/api/user/login',
      method: 'post',
      data
    })
  }
}

/**
 * @description [ sys ] 用户相关
 */
export const sysUserService = {
  /**
   * 获取用户信息
   */
  getInfo () {
    return request({
      url: 'http://localhost:8000/api/sys/user/info'
      // url: 'http://192.17.1.150:8000/api/sys/user/info'
    })
  },
  updatePassword (data) {
    return request({
      url: '/sys/user/password',
      method: 'put',
      data
    })
  }
}
