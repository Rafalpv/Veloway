import { useMapMarkers } from '../context/MapMarkersContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Mark = ({ markerId, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: markerId })
  const { selectedMarker, setSelectedMarker, steps, totalMarkers, isRoundTrip } = useMapMarkers()

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const handleClick = (e) => {
    e.stopPropagation() // Evita que el evento se propague
    console.log('click')
  }

  return (
    <div
      ref={setNodeRef} {...attributes} {...listeners} style={style}
      className="m-2"
    >
      <button
        onClick={handleClick}
        className="w-full"
      >
        <div
          className={`
          h-14 flex items-center justify-center rounded-full 
          border-2 border-black shadow-lg
          hover:scale-105
          ${index === 0 ? 'bg-green-500 font-bold' : 'bg-white'}
          ${selectedMarker === markerId ? 'border-yellow-400' : ''}
          `}
          onMouseEnter={() => setSelectedMarker(markerId)}
          onMouseLeave={() => setSelectedMarker(null)}
        >
          <span className="w-full h-full flex items-center justify-center rounded-full aspect-square font-semibold">
            {index === 0 ? `► INICIO ${steps.length > 0 ? steps[index].start_address : ''}` : (index === totalMarkers && !isRoundTrip) ? '► FIN' : index}
          </span>
        </div>
      </button>
    </div>
  )
}

export default Mark
