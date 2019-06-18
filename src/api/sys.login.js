import request from '@/plugin/axios'

export function login (data) {
  return request({
    url: 'http://192.168.4.201:8000/api/user/login',
    method: 'post',
    data
  })
}
