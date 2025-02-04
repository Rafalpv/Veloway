import { IoFilter } from 'react-icons/io5'
import { useContext, useState } from 'react'
import { UsersContext } from '../context/UsersContext'

const FilterButtonLevel = () => {
  const { filterByLevel, resetFilters } = useContext(UsersContext)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedLevels, setSelectedLevels] = useState([])
  const levels = ['beginner', 'intermediate', 'advanced']

  const toggleMenu = () => setShowMenu(!showMenu)

  const handleCheckboxChange = (level) => {
    let updatedLevels = [...selectedLevels]
    if (updatedLevels.includes(level)) {
      updatedLevels = updatedLevels.filter(l => l !== level)
    } else {
      updatedLevels.push(level)
    }
    setSelectedLevels(updatedLevels)
    if (updatedLevels.length === 0) {
      resetFilters()
    } else {
      filterByLevel(updatedLevels)
    }
  }

  return (
    <div className='relative inline-block'>
      <button
        onClick={toggleMenu}
        className='ml-2 px-2 py-1 bg-transparent hover:bg-gray-200'
      >
        <IoFilter />
      </button>

      {showMenu && (
        <div className='absolute left-0 mt-2 bg-gray-200 border rounded shadow-boton p-2'>
          {levels.map(level => (
            <label key={level} className="block px-2 py-1">
              <input
                type='checkbox'
                checked={selectedLevels.includes(level)}
                onChange={() => handleCheckboxChange(level)}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterButtonLevel
