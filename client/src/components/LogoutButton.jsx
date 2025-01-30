import axiosInstance from '../api/axiosInstance'
import { IoMdLogOut } from 'react-icons/io'

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
    <>
      <button
        className="h-14 w-14 flex items-center justify-center rounded-full border-2 border-black text-black text-2xl hover:bg-black hover:text-white transition-all duration-300"
        onClick={handleLogout}
      >
        <IoMdLogOut />
      </button>
    </>
  )
}

export default LogoutButton
