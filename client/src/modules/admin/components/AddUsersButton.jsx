import { IoAddCircleSharp } from 'react-icons/io5'
import { useState } from 'react'
import NewUserForm from '@auth/components/NewUserForm'

const AddUsersButton = () => {
  const [showModal, setShowModal] = useState(false)

  const handleAddUser = () => {
    console.log('Añadir usuario')
  }

  return (
    <>
      <button
        className="justify-between px-6 py-2 border-2 border-black shadow-boton rounded-full hover:bg-gray-400 duration-300"
        onClick={() => setShowModal(!setShowModal)}
      >
        <IoAddCircleSharp className="text-4xl cursor-pointer" />
      </button>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-slate-300 p-6 rounded-lg shadow-lg'>
            <NewUserForm isAdmin={true}/>
            <button onClick={() => setShowModal(!setShowModal)} className='ml-4 px-4 py-2 bg-red-500 rounded-full'>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AddUsersButton
