import { IoAddCircleSharp } from 'react-icons/io5'

const AddUsersButton = () => {
  return (
    <button className='justify-between px-6 py-2 border-2 border-black shadow-boton rounded-full hover:bg-gray-400 duration-300'>
      <IoAddCircleSharp className="text-4xl cursor-pointer" />
    </button>
  )
}

export default AddUsersButton
