import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  if (!auth) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
