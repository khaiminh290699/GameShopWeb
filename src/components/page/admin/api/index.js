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
  },

  createCoupon: (
    title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner, product_apply, product_no_apply, category_apply, category_no_apply, code, description
  ) => {
    return baseApi.post(`/coupon/create`, {
      title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner, 
      product_apply: product_apply.map(item => item.id), 
      product_no_apply: product_no_apply.map(item => item.id),  
      category_apply: category_apply.map(item => item.id),  
      category_no_apply: category_no_apply.map(item => item.id),  
      code, description
    });
  },

  getListCoupons: (page, limit) => {
    return baseApi.post(`/coupon/list`, {
      wheres: { is_deleted: { eq: false } },
      order: [["createdAt", "desc"]],
      page, limit
    });
  },

  getCoupon: (id) => {
    return baseApi.get(`/coupon/${id}`);
  },

  updateCoupon: (
    id, title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner, product_apply, product_no_apply, category_apply, category_no_apply, code, description
  ) => {
    return baseApi.put(`/coupon/update`, {
      id,
      title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner, 
      product_apply: product_apply.map(item => item.id), 
      product_no_apply: product_no_apply.map(item => item.id),  
      category_apply: category_apply.map(item => item.id),  
      category_no_apply: category_no_apply.map(item => item.id),  
      code, description
    });
  },

  deleteCoupon: (id) => {
    return baseApi.post(`/coupon/delete`, {
      id
    });
  }
}