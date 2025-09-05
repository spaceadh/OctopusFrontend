import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// You can add interceptors for handling tokens, errors, etc.
// apiClient.interceptors.request.use(...)
// apiClient.interceptors.response.use(...)

export default apiClient
