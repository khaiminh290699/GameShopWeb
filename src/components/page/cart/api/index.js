import baseApi from "../../../../ultilities/axios"

export default {
  getPorudctByIds:(ids) => {
    return baseApi.post(`/product/get-by-ids`, {
      ids
    })
  },
  createOrder: (products, address, phone_number, code) => {
    return baseApi.post(`/order/create`, {
      products, address, phone_number, code
    })
  },
  rejectOrder: (order_id) => {
    return baseApi.post(`/order/update-status`, {
      id: order_id, status: 3
    })
  },
  getListEffectCoupons: () => {
    return baseApi.post(`/coupon/list`, {
      wheres: {
        effect_at: { lte: new Date() },
        expiry_at: { gte: new Date() },
        is_deleted: { eq: false },
        amount: { gt: 0 }
      },
      page: null,
      limit: null,
      order: [["effect_at", "DESC"]]
    })
  },
  applyCoupon: (code, products) => {
    return baseApi.post(`/coupon/apply-coupon`, {
      code,
      products
    })
  }
}