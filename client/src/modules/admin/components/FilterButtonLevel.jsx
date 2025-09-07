import { useContext } from 'react'
import { UsersContext } from '../context/UsersContext'
import { IoFilter } from 'react-icons/io5'

const FilterButtonLevel = ({ showMenu, setShowMenu }) => {
  const { filterByLevel, selectedLevels } = useContext(UsersContext)

  const levels = ['beginner', 'intermediate', 'advanced']

  const handleCheckboxChange = (level) => {
    const updatedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level]

    filterByLevel(updatedLevels)
  }

  return (
    <div className='relative inline-block'>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className='ml-2 bg-transparent'
      >
        <IoFilter />
      </button>

      {showMenu && (
        <div className='absolute left-2 mt-2 bg-gray-200 border rounded shadow-lg p-2 z-99 min-w-48'>
          {levels.map(level => (
            <label key={level} className='block text-xl py-1'>
              <input
                type='checkbox'
                checked={selectedLevels.includes(level)}
                onChange={() => handleCheckboxChange(level)}
                className='mr-2'
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
