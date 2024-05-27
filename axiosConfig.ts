import axios from 'axios'

const Base_URL = process.env.NEXT_PUBLIC_REACT_APP_API_URL

const api = axios.create({
    baseURL: Base_URL
})

export default api

