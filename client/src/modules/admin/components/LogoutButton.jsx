import { IoMdLogOut } from 'react-icons/io'
import { useAuth } from '@auth/context/AuthContext'

const LogoutButton = () => {
  const { logout } = useAuth()
  return (
    <>
      <button
        className="h-12 w-12 flex items-center justify-center rounded-full border-2 border-black text-black text-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
        onClick={logout}>
        <IoMdLogOut />
      </button>
    </>
  )
}

export default LogoutButton
