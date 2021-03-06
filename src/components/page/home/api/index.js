import baseApi from "../../../../ultilities/axios"

export default {
  getProduct: (pageIndex, pageSize, order, wheres = {}) => {
    return baseApi.post(`/product/list`, {
      select: ["id", "title", "price", "stock", "images", "createdAt"],
      wheres: {
        ...wheres,
        is_deleted: {
          eq: false
        }
      },
      page: pageIndex,
      limit: pageSize,
      order
    })
  },
  getCateById: (id) => {
    return baseApi.get(`/category/${id}`);
  },
  getCoupons: (wheres, order) => {
    return baseApi.post(`/coupon/list`, { wheres, order });
  },
  getTopRate: (category_id, top) => {
    return baseApi.post(`/product/top-rating`, { category_id, top });
  }
}