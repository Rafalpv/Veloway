import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()
  console.log(auth.authState.auth)
  if (!auth.authState.auth) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
