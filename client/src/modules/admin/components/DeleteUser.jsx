import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import { TiDelete } from 'react-icons/ti'
import toast from 'react-hot-toast'

const DeleteUser = ({ nickname }) => {
  const { deleteUser } = useContext(UsersContext)

  const handleDeleteUser = () => {
    toast((t) => (
      <div className="rounded-lg flex flex-col items-center text-center">
        <p className="text-lg font-semibold mb-2 text-gray-800">
          ¿Eliminar usuario <span className="font-bold text-red-600">{nickname}</span>?
        </p>
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => {
              deleteUser(nickname)
              toast.dismiss(t.id)
            }}
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 transition"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: 4000,
      style: {
        minWidth: '100px',
        background: '#DFDED3',
        border: '2px solid black',
        padding: '16px'

      }
    })
  }

  return (
    <button
      className='px-1 py-1 border-2 border-black shadow-boton rounded-full hover:bg-red-400 duration-300'
      onClick={handleDeleteUser}
    >
      <TiDelete className='text-4xl cursor-pointer' />
    </button>
  )
}

export default DeleteUser
