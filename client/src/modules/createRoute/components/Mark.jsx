import { useMapMarkers } from '../context/MapMarkersContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaFlagCheckered } from 'react-icons/fa'

const Mark = ({ markerId, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: markerId })
  const { selectedMarker, setSelectedMarker, totalMarkers, steps } = useMapMarkers()
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      className={`${index === 0 ? 'bg-green' : 'bg-zinc-500'} ${(selectedMarker === markerId) ? ' flex flex-row border-2 border-yellow-400' : ''} p-4 m-2 cursor-pointer rounded-full`}
      ref={setNodeRef} {...attributes} {...listeners} style={style}
      onMouseEnter={() => setSelectedMarker(markerId)}
      onMouseLeave={() => setSelectedMarker(null)}>
      {index === 0 ? `► ${steps.length > 0 ? steps[index].start_address : ''}` : totalMarkers === index ? <FaFlagCheckered /> : index}
      </div >
  )
}

export default Mark
