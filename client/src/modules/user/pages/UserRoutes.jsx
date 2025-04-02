import { NavLink } from 'react-router'
import { IoAdd } from 'react-icons/io5'

const UserRoutes = () => {
  return (
    <nav className='flex space-x-20 text-xl font-semibold'>
      <NavLink
        to='create'
        className='bg-green py-2 px-5 m-6 rounded-2xl border-2 border-black hover:bg-greenButtonHover'
      >
        <IoAdd size={35} />
      </NavLink>

    </nav>
  )
}

export default UserRoutes
