import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Mark = ({ markerId, position }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: markerId })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div className='bg-zinc-500 p-4 m-2 cursor-pointer rounded' ref={setNodeRef} {...attributes} {...listeners} style={style}>
      Lat: {position[0]}, Lng: {position[1]}
    </div>
  )
}

export default Mark
