import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import { MdOutlineRefresh } from 'react-icons/md'

const ResetButton = ({ setShowMenu }) => {
  const { resetFilters } = useContext(UsersContext)
  const handlerResetFilters = () => {
    resetFilters()
    setShowMenu(false)
  }
  return (
    <button
      className='justify-between px-6 py-2 border-2 shadow-boton rounded-full
    border-black hover:bg-gray-400 duration-300' onClick={handlerResetFilters}
    >
      <MdOutlineRefresh className='text-4xl cursor-pointer' />
    </button>
  )
}

export default ResetButton
