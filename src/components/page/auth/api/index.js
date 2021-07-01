import baseApi from "../../../../ultilities/axios"

export default {
  signUp: (username, email, password) => {
    return baseApi.post("/auth/sign-up", {
      username, email, password
    })
  },
  forgetPassword: (email) => {
    return baseApi.post("/auth/forget-password", {
      email
    })
  },
  signIn: (email, password) => {
    return baseApi.post("/auth/sign-in", {
      email, password
    })
  },
  updateProfile: (email, username, old_password, password) => {
    return baseApi.post("/auth/update-profile", {
      email, username, old_password, password
    })
  }
}