import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import { IoSearchOutline } from 'react-icons/io5'

const FilterButton = () => {
  const { filterUsers, searchTerm, resetFilters } = useContext(UsersContext)

  const handleSearch = (e) => {
    const value = e.target.value
    filterUsers(value)
    if (!value) resetFilters()
  }

  return (
    <div className='flex items-center gap-2 border-2 border-black rounded-full px-4 py-2 shadow-boton'>
      <IoSearchOutline className='text-4xl text-black' />
      <input
        className='w-full bg-transparent text-xl focus:outline-none'
        type='text'
        value={searchTerm}
        placeholder='Buscar...'
        onChange={handleSearch}
      />
    </div>
  )
}

export default FilterButton
