import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  if (auth === null) {
    return <div>Loading...</div> // Muestra algo mientras se verifica
  }

  if (!auth) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
