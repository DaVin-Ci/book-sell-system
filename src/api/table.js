import request from '@/utils/request'

// 订单相关
export function getOrderList(params) {
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

// 图书相关
export function getAllBookList({ page, size }) {
  return request({
    url: `/book/`,
    method: 'get',
    params: {
      page, size
    }
  })
}

// 根据分类cid查询该分类所有图书(一级二级均可)
export function getBookListByCategory({ categoryId, page, size }) {
  return request({
    url: `/book/category/${categoryId}`,
    method: 'get',
    params: {
      page, size
    }
  })
}

export function getBookDetail(bookid) {
  return request({
    url: `/book/${bookid}`,
    method: 'get',
  })
}

export function editBookDetail(data) {
  return request({
    url: `/book/`,
    method: 'put',
    data
  })
}

export function addBook(data) {
  return request({
    url: `/book/`,
    method: 'post',
    data
  })
}

export function deleteBook(bookid) {
  return request({
    url: `/book/${bookid}`,
    method: 'delete',
  })
}

// 根据图书名、作者或出版社进行综合查询
export function getBookListByCondition(params) {
  return request({
    url: `/book/search/`,
    method: 'get',
    params
  })
}

// 分类相关
export function getAllCategory() {
  return request({
    url: `/category/`,
    method: 'get',
  })
}

