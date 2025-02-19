import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import toast from 'react-hot-toast'
import { FaUserEdit } from 'react-icons/fa'

const EditUser = ({ nickname }) => {
  const handleEditUser = () => {
    console.log('Editando usuario:', nickname)
  }

  return (
    <button
      className='items-center px-2 py-2 border-2 border-black shadow-boton rounded-full hover:bg-gold duration-300'
      onClick={handleEditUser}
    >
      <FaUserEdit className='text-4xl cursor-pointer' size={28}/>
    </button>
  )
}

export default EditUser
