import baseApi from "../../../../ultilities/axios"

export default {
  getPorudctDetails:(id) => {
    return baseApi.get(`/product/${id}`)
  },
  getProducts: (pageIndex, pageSize, order, wheres = {}) => {
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
  getCategories: (pageIndex = 0, pageSize = 1000, order = [["createdAt", "DESC"]], wheres = {}) => {
    return baseApi.post(`/category/list`, {
      select: ["id", "title"],
      wheres: {
        ...wheres
      },
      page: pageIndex,
      limit: pageSize,
      order
    })
  },

  getRating(product_id) {
    return baseApi.post("/product/get-rating", {
      product_id
    })
  },

  rating(product_id, rating) {
    return baseApi.post("/product/rating", {
      product_id, rating
    })
  },
}