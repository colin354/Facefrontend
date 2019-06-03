import request from '@/plugin/axios'

export function login (data) {
  return request({
    url: 'http://localhost:8000/api/user/login',
    method: 'post',
    data
  })
}
