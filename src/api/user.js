import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/login',
    method: 'post',
    data // { account:admin, password:123456 }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
