import ThemeButton from '../../utils/components/ThemeButton'
import { IoAdd, IoShareSocial } from 'react-icons/io5'
import { TbRouteSquare } from 'react-icons/tb'
import { IoMdLogOut } from 'react-icons/io'
import { NavLink } from 'react-router'
import { useAuth } from '@auth/context/AuthContext'

const Header = () => {
  const { authState, logout } = useAuth()

  return (
    <header className='flex flex-wrap justify-between items-center mb-7 pb-5 gap-4 border-b-2 border-black dark:border-white'>
      <h1 className="text-5xl font-bold text-primary-light dark:text-primary-dark">
        {authState.user.nickname} 👋
      </h1>

      <div className='flex items-center gap-4'>
        <NavLink
          to={`/${authState.user.nickname}`}
          className='flex items-center gap-2 bg-primary-light dark:bg-primary-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all'>
          <TbRouteSquare /> Mis Rutas
        </NavLink>

        <NavLink
          to="community"
          className="flex items-center gap-2 bg-secondary-light dark:bg-secondary-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all"
        >
          <IoShareSocial size={24} />
          <span>Comunidad</span>
        </NavLink>

        <NavLink
          to="create"
          className="flex items-center gap-2 bg-button-light dark:bg-button-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all"
        >
          <IoAdd size={24} />
          <span>Crear Ruta</span>
        </NavLink>

        <ThemeButton />

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-danger-light dark:bg-danger-dark hover:opacity-90 text-white font-semibold p-2 rounded-full shadow transition-all"
        >
          <IoMdLogOut size={25} />
        </button>

      </div>
    </header>
  )
}

export default Header
