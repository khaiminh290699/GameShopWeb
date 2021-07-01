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
  }
}