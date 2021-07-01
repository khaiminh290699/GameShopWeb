import baseApi from "../../../../ultilities/axios"

export default {
  getOrders:(wheres, pageIndex, pageSize, order) => {
    return baseApi.post(`/order/list`, {
      wheres,
      page: pageIndex,
      limit: pageSize,
      order
    })
  },
  updateState: (id, status) => {
    return baseApi.post(`/order/update-status`, {
      id,
      status
    })
  },
  getOrderById: (id) => {
    return baseApi.get(`/order/${id}`)
  }
}