import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/order/',
    method: 'get',
    params
  })
}

export function cancelOrder(orderid) {
  return request({
    url: `/order/cancel/${orderid}`,
    method: 'put',
  })
}

export function deliverOrder(orderid) {
  return request({
    url: `/order/deliver/${orderid}`,
    method: 'put',
  })
}

export function getOrderDetail(orderid) {
  return request({
    url: `/order/${orderid}`,
    method: 'get',
  })
}