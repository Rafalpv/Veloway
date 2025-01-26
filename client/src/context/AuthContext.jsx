import { createContext, useContext, useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    auth: false,
    user: null // Aquí guardaremos la información del usuario
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-auth')
        setAuthState({
          auth: true,
          user: response.data.nickname
        })
      } catch (err) {
        setAuthState({ auth: false, user: null })
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    await axiosInstance.get('/auth/logout')
    setAuthState({ auth: false, user: null })
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
