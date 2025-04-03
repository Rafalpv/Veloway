import { useMapMarkers } from '@user/context/MapMarkersContext'
import { DndContext, closestCorners } from '@dnd-kit/core'
import TimeDistanceInfo from './TimeDistanceInfo'
import ListMarkers from './ListMarkers'
import { useMarkersContext } from '../pages/CreateRoute'

const ListMarcadores = () => {
  const { handleDragEnd } = useMapMarkers()
  const { listVisible } = useMarkersContext()

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className={`relative flex flex-col justify-start ${listVisible ? 'w-1/3' : 'hidden'} bg-neutral-100 border-2 h-screen p-4`}>
          <ListMarkers />
          <TimeDistanceInfo />
        </div >
      </DndContext >
    </>
  )
}

export default ListMarcadores
