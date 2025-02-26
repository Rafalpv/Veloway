import { useMapMarkers } from '@user/context/MapMarkersContext'
import { DndContext, closestCorners } from '@dnd-kit/core'
import MarketsSwapy from './MarketsSwapy'

const ListMarcadores = () => {
  const { markers, handleDragEnd } = useMapMarkers()

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <MarketsSwapy markers={markers} />
      </DndContext>
    </>
  )
}

export default ListMarcadores
