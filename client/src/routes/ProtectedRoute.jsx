import { Navigate } from 'react-router'
import { useAuth } from '@auth/context/AuthContext'
import { IoIosBicycle } from 'react-icons/io'

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth()

  if (authState.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <IoIosBicycle className="animate-spin text-blue-500" size={50} />
      </div>
    )
  }

  if (!authState.auth) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
