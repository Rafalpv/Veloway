import { useContext, useState } from 'react'
import { UsersContext } from '../context/UsersContext'
import { IoFilter } from 'react-icons/io5'

const FilterButtonLevel = () => {
  const { filterByLevel, selectedLevels } = useContext(UsersContext)
  const [showMenu, setShowMenu] = useState(false)

  const levels = ['beginner', 'intermediate', 'advanced']

  const handleCheckboxChange = (level) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level]

    filterByLevel(updatedLevels)
  }

  return (
    <div className='relative inline-block'>
      <button onClick={() => setShowMenu(!showMenu)} className='ml-2 px-2 py-1 bg-transparent hover:bg-gray-200'>
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
