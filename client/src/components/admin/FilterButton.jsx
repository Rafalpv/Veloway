import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext'
import { IoSearchOutline } from 'react-icons/io5'

const FilterButton = () => {
  const { filterUsers, searchTerm } = useContext(UsersContext)

  const handleSearchTerm = (e) => {
    filterUsers(e.target.value)
  }

  return (
    <div className='flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-4 py-2 shadow-boton'>
      <IoSearchOutline className='text-4xl text-black' />
      <input
        className='w-full bg-transparent text-xl focus:outline-none'
        type='text'
        value={searchTerm}
        placeholder='Buscar...'
        onChange={handleSearchTerm}
      />
    </div>

  )
}

export default FilterButton
