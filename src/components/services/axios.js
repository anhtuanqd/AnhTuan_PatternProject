import axios from 'axios'

const KEY_NASA = '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'
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // timeout: 1000,
  headers: {
    Authorization: 'Bearer' + KEY_NASA
  }
})

instance.interceptors.response.use((response) => {
  const { data } = response
  return data
})

export default instance
