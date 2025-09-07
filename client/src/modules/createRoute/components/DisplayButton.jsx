import { IoMdArrowDropleft } from 'react-icons/io'

const getDirectionArrow = (direction, isOpen) => {
  const rotations = {
    left: isOpen ? 'rotate-180' : 'rotate-0',
    right: isOpen ? 'rotate-0' : 'rotate-180',
    up: isOpen ? '-rotate-90' : 'rotate-90',
    down: isOpen ? 'rotate-90' : '-rotate-90'
  }
  return rotations[direction] || ''
}

const DisplayAsideButton = ({ isVisible, setIsVisible, position, direction }) => {
  return (
    <div className={`absolute ${position} transform z-[500]`}>
      <button
        className='bg-white border-2 border-gray-700 shadow-lg rounded-full p-0.5 transition-transform duration-300 hover:bg-gray-200 active:scale-95'
        onClick={() => setIsVisible(!isVisible)}
      >
        <IoMdArrowDropleft
          size={30}
          className={`text-gray-700 transition-transform duration-300 ${getDirectionArrow(direction, isVisible)}`}
        />
      </button>
    </div>
  )
}

export default DisplayAsideButton
