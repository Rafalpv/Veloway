import { DndContext, closestCorners } from '@dnd-kit/core'
import MarketsSwapy from './MarketsSwapy'
import { useMapMarkers } from '@user/context/MapMarkersContext' // Usamos el contexto

const ListMarcadores = () => {
  const { markers, handleDragEnd } = useMapMarkers()

  return (
    <div className='w-1/3'>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <MarketsSwapy markers={markers} />
      </DndContext>
    </div>
  )
}

export default ListMarcadores
