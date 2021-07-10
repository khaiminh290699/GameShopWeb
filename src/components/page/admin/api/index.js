import baseApi from "../../../../ultilities/axios"

export default {
  getCategoryTitle:() => {
    return baseApi.post("/category/list", {
      select: ["id", "title"],
      limit: 1000000
    })
  },
  createProduct:(title, images, price, stock, description, category_id, properties) => {
    return baseApi.post("/product/create", {
      title, images, price, stock, description, category_id, properties
    })
  },
  updateProduct:(id, title, images, price, stock, description, category_id, properties) => {
    return baseApi.put("/product/update", {
      id, title, images, price, stock, description, category_id, properties
    })
  },
  getProductById: (id) => {
    return baseApi.get(`/product/${id}`);
  },
  deleteProduct: (id) => {
    return baseApi.post(`/product/delete`, {
      ids: [id]
    });
  },
  createCategory: (title, banner) => {
    return baseApi.post(`/category/create`, {
      title, banner
    });
  },
  getCategory: (pageIndex, pageSize, order) => {
    return baseApi.post(`/category/list`, {
      page: pageIndex,
      limit: pageSize,
      order
    })
  },
  getGateById: (id) => {
    return baseApi.get(`/category/${id}`);
  },
  updateCategory: (id, title, banner) => {
    return baseApi.put("/category/update", {
      id, title, banner
    })
  },
  deleteCatetory: (id) => {
    return baseApi.post(`/category/delete`, {
      ids: [id]
    });
  }
}