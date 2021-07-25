import baseApi from "../../../../ultilities/axios"

export default {
  getCategories: (pageIndex, pageSize, order, wheres = {}) => {
    return baseApi.post(`/category/list`, {
      select: ["id", "title", "banner"],
      wheres: {
        ...wheres
      },
      page: pageIndex,
      limit: pageSize,
      order
    })
  },
}