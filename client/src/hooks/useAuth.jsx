import { useEffect, useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const useAuth = () => {
  const [authState, setAuthState] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth')
        setAuthState(response.data.auth)
      } catch (err) {
        setAuthState(false)
      }
    }

    checkAuth()
  }, [])

  return authState
}

export default useAuth
