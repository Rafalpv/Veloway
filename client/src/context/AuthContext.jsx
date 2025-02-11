import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    auth: false,
    user: null,
    loading: true // Nuevo estado para controlar la carga
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // const response = await axiosInstance.get('/auth/check-auth')
        setAuthState({
          auth: true,
          user: response.data.user,
          loading: false
        })
      } catch (err) {
        setAuthState({ auth: false, user: null, loading: false })
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    await axiosInstance.get('/auth/logout')
    setAuthState({ auth: false, user: null, loading: false })
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
