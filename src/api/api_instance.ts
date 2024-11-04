import axios from 'axios'
let token = ''
if (typeof window !== 'undefined') {
  token = localStorage.getItem('access_token') ?? ''
}

const api = axios.create({
  baseURL: 'https://api.betiball.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
})
api.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
