import { useContext, useState } from 'react'
import { UsersContext } from '../context/UsersContext'
import { IoSearchOutline } from 'react-icons/io5'

const FilterButton = () => {
  const { filterUsers, resetFilters } = useContext(UsersContext)
  const [searchTerms, setSearchTerms] = useState('')

  const handleSearchTerm = (e) => {
    setSearchTerms(e.target.value)
    if (e.target.value === '') {
      resetFilters()
    } else {
      filterUsers(e.target.value)
    }
  }

  return (
    <div className='flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-4 py-2 shadow-boton'>
      <IoSearchOutline className='text-4xl text-black' />
      <input
        className='w-full bg-transparent text-xl focus:outline-none'
        type='text'
        value={searchTerms}
        placeholder='Buscar...'
        onChange={handleSearchTerm}
      />
    </div>

  )
}

export default FilterButton
