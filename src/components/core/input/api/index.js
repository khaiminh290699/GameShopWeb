import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080"

export default {
  upload: (file) => {
    const token = localStorage.getItem("token");
    const form = new FormData();
    form.append("image", file)
    return axios.post(`${API_URL}/file/upload`, form, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  },
  removeFile: (file) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/file/remove`, {
      file
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }
}