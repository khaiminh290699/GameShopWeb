import baseApi from "../../../../ultilities/axios"

export default {
  getPorudctByIds:(ids) => {
    return baseApi.post(`/product/get-by-ids`, {
      ids
    })
  },
  createOrder: (products, address, phone_number) => {
    return baseApi.post(`/order/create`, {
      products, address, phone_number
    })
  },
  rejectOrder: (order_id) => {
    return baseApi.post(`/order/update-status`, {
      id: order_id, status: 3
    })
  }
}