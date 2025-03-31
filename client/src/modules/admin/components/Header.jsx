import LogoutButton from './LogoutButton'
import { MdOutlineDarkMode } from 'react-icons/md'
import { NavLink } from 'react-router'

const Header = () => {
  return (
    <header className='flex items-center justify-around p-4 mb-6 border-b border-black'>
      <h2 className='text-7xl font-sixcaps tracking-wider'>VELOWAY </h2>

      {/* Título y enlaces */}
      <div className='flex flex-col items-center space-y-8'>

        <nav className='flex space-x-20 text-xl font-semibold'>
          <NavLink
            to='/admin'
            className={({ isActive }) => isActive ? '' : ''}
          >
            Inicio
          </NavLink>
          <NavLink
            to='/admin/users'
            className={({ isActive }) => isActive ? '' : ''}
          >
            Usuarios
          </NavLink>
          <NavLink
            to='/admin/orders'
            className={({ isActive }) => isActive ? '' : ''}
          >
            Pedidos
          </NavLink>
          <NavLink
            to='/admin/retos'
            className={({ isActive }) => isActive ? '' : ''}
          >
            Retos
          </NavLink>
        </nav>

      </div >

      {/* Botones de accesibilidad y logout */}
      < div className="flex items-center space-x-4" >
        <button className="border border-black p-2 rounded-full hover:bg-gray-400 transition">
          <MdOutlineDarkMode className="text-xl" />
        </button>
        <LogoutButton />
      </div >
    </header >
  )
}

export default Header
