import axios from 'axios'
import jwt from 'jsonwebtoken'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {}
