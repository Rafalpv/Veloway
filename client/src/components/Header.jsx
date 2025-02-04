import { FiMenu } from 'react-icons/fi'
import { MdOutlineDarkMode, MdOutlineRefresh } from 'react-icons/md'
import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 mb-6 border-b border-black'>
      <FiMenu className="text-4xl cursor-pointer" />
      {/* Título y enlaces */}
      <div className='flex flex-col items-center space-y-8'>
        <h1 className='text-3xl font-bold'>Veloway Admin</h1>
        <nav className="flex space-x-20 text-lg">
          <a href="#" className="font-semibold border-b-2 border-black">Usuarios</a>
          <a href="#" className="hover:text-gray-600 transition">Estadísticas</a>
          <a href="#" className="hover:text-gray-600 transition">Algo más</a>
        </nav>
      </div>

      {/* Botones de accesibilidad y logout */}
      <div className="flex items-center space-x-4">
        <button className="border border-black p-2 rounded-full hover:bg-gray-400 transition">
          <MdOutlineDarkMode className="text-xl" />
        </button>
        <button className="border border-black p-2 rounded-full hover:bg-gray-300 transition">
          <MdOutlineRefresh className="text-xl" />
        </button>
        <LogoutButton />
      </div>
    </header>
  )
}

export default Header
