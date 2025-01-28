import axiosInstance from '../api/axiosInstance'

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get('/auth/logout')
      return response.data
    } catch (error) {
      return error.response.data
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  )
}

export default LogoutButton
