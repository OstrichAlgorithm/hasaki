// 仅示例
import request from '@/utils/request'

// export function login (data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo (token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function message () {
  return request({
    url: '/message',
    method: 'get'
  })
}

export function auth () {
  return request({
    url: '/auth',
    method: 'get'
  })
}
