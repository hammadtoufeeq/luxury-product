import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true
})
api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const failedRequest = error.config
    const status = error.response?.status

    if (status !== 401) return Promise.reject(error)
    if (failedRequest.url === '/users/refresh') return Promise.reject(error)
    if (failedRequest._retry) return Promise.reject(error)

    failedRequest._retry = true

    try {
      await api.post('/users/refresh')
      return api(failedRequest)
    } catch {
      return Promise.reject(error)
    }
  }
)

export default api