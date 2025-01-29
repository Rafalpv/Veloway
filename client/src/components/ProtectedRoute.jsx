import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const state = useAuth()
  if (!state.authState.auth) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
