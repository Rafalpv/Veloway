import { useMapMarkers } from '../context/MapMarkersContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaFlagCheckered } from 'react-icons/fa'

const Mark = ({ markerId, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: markerId })
  const { selectedMarker, setSelectedMarker, totalMarkers, steps, handleDeleteMark } = useMapMarkers()
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      className={`
      h-14 flex items-center justify-center rounded-full 
      border-2 border-black shadow-lg m-2
      hover:scale-105
      ${index === 0 ? 'bg-green-500 font-bold' : 'bg-white'}
      ${selectedMarker === markerId ? 'border-yellow-400' : ''}
      `}
      ref={setNodeRef} {...attributes} {...listeners} style={style}
      onMouseEnter={() => setSelectedMarker(markerId)}
      onMouseLeave={() => setSelectedMarker(null)}
    >
      <span className="w-full h-full flex items-center justify-center rounded-full aspect-square font-semibold">
        {index === 0 ? `► ${steps.length > 0 ? steps[index].start_address : ''}` : index}
      </span>
    </div>
  )
}

export default Mark
