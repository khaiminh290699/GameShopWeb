import baseApi from "../../../../ultilities/axios"

export default {
  getUser: () => {
    return baseApi.post(`/auth/get-user`);
  }
}