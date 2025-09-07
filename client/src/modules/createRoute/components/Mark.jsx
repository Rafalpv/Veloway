import { useState } from 'react'
import { useMapMarkers } from '../context/MapMarkersContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TiDelete } from 'react-icons/ti'

const Mark = ({ marker, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: marker.markerId })
  const { route, selectedMarker, setSelectedMarker, totalMarkers, handleDeleteMark } = useMapMarkers()
  const [moreInfoMark, setMoreInfoMark] = useState(false)

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div className='flex items-center w-full'>
      <div
        ref={setNodeRef} {...attributes} {...listeners} style={style}
        className='m-2 flex-1'
      >
        <div
          className={`
          ${(moreInfoMark) ? 'h-40' : 'min-h-14 h-auto'} 
          w-full rounded-lg
          flex items-center justify-center border-2 border-black shadow-lg 
          hover:scale-105
          ${index === 0 ? 'bg-[#C8D7AB]' : 'bg-[#EEF0D5]'}
          ${index === totalMarkers && route.isRoundTrip ? 'bg-[#abc969]' : ''}
          ${selectedMarker === marker.markerId ? 'border-yellow-400' : ''}
          `}
          onMouseEnter={() => setSelectedMarker(marker.markerId)}
          onMouseLeave={() => setSelectedMarker(null)}
        >
          <span className='flex-1 flex items-center justify-center text-sm font-extrabold ml-2'>
            {index === 0
              ? route.steps[index]?.start_address
              : (index === totalMarkers && !route.isRoundTrip)
                  ? route.steps[totalMarkers - 1]?.end_address
                  : route.steps[index]?.start_address}
          </span>
        </div>
      </div>
      <button
        className=''
        onClick={(e) => {
          e.stopPropagation()
          handleDeleteMark(marker.markerId)
        }}
      >
        <TiDelete size={30} className='ml-1 hover:scale-110 hover:text-red-500' />
      </button>
    </div>
  )
}

export default Mark
