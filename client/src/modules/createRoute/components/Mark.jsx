import { useState } from 'react'
import { useMapMarkers } from '../context/MapMarkersContext'
import { useSortable } from '@dnd-kit/sortable'
import { useMarkersContext } from '../pages/CreateRoute'
import { CSS } from '@dnd-kit/utilities'
import { TiDelete } from 'react-icons/ti'

const Mark = ({ marker, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: marker.markerId })
  const { selectedMarker, setSelectedMarker, legs, totalMarkers, isRoundTrip, setPosition, handleDeleteMark } = useMapMarkers()
  const { listVisible } = useMarkersContext()
  const [moreInfoMark, setMoreInfoMark] = useState(false)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const handleClick = () => {
    setMoreInfoMark(!moreInfoMark)
    if (!moreInfoMark) { setPosition(marker.position) }
  }

  return (
    <div className="flex items-center w-full">
      <div
        ref={setNodeRef} {...attributes} {...listeners} style={style}
        className="m-2 flex-1"
      >
        <div
          className={`
          ${(moreInfoMark && listVisible) ? 'h-40' : 'h-14'} 
          ${listVisible ? 'w-full rounded-lg' : 'w-14 aspect-square rounded-full'}
          flex items-center justify-center border-2 border-black shadow-lg 
          hover:scale-105
          ${index === 0 ? 'bg-green-500 font-bold' : 'bg-white'}
          ${selectedMarker === marker.markerId ? 'border-yellow-400' : ''}
          `}
          onMouseEnter={() => setSelectedMarker(marker.markerId)}
          onMouseLeave={() => setSelectedMarker(null)}
        >
          <span className={'flex-1 flex items-center justify-center text-sm font-semibold px-5'}>
            {index === 0
              ? `► ${listVisible ? legs[index]?.start_address : ''}`
              : (index === totalMarkers && !isRoundTrip)
                  ? `► ${listVisible ? legs[totalMarkers - 1]?.end_address : ''}`
                  : `${listVisible ? legs[index]?.start_address : index}`}
          </span>
        </div>
      </div>
      {/* {listVisible && (
        <button className="ml-2 transition-transform duration-300" onClick={handleClick}>
          <MdOutlineKeyboardArrowDown size={30} className={`${moreInfoMark ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      )} */}
      {listVisible && <button
        className='ml-3'
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteMark(marker.markerId)
        }}
      >
        <TiDelete size={30} />
      </button>}
    </div>
  )
}

export default Mark
