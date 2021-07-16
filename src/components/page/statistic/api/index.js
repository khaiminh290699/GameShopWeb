import baseApi from "../../../../ultilities/axios"

export default {
  getTopUser:(amount = 1, unit = "month", top = 3) => {
    return baseApi.post(`/statistic/top-user`, {
      amount, unit, top
    })
  },
  getTopProduct:(amount = 1, unit = "month", top = 3) => {
    return baseApi.post(`/statistic/top-product`, {
      amount, unit, top
    })
  },
  getStatisticOverall:(amount = 1, unit = "month", top = 3) => {
    return baseApi.post(`/statistic/overall`, {
      amount, unit, top
    })
  },
  getStatisticOrder:(amount = 1, unit = "month") => {
    return baseApi.post(`/statistic/order`, {
      amount, unit
    })
  },
}