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
      method: 'post',
      data
    })
  }
}
