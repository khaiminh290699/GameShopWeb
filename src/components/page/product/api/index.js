import baseApi from "../../../../ultilities/axios"

export default {
  getPorudctDetails:(id) => {
    return baseApi.get(`/product/${id}`)
  }
}