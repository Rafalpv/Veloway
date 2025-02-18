import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Mark = ({ markerId, position, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: markerId })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div className={`${index === 0 ? 'bg-green' : 'bg-zinc-500'} p-4 m-2 cursor-pointer rounded`} ref={setNodeRef} {...attributes} {...listeners} style={style} >
      {index + 1
      }.{markerId}
    </div >
  )
}

export default Mark
