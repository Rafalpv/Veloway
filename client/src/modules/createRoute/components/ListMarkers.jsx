import Mark from './Mark'
import { useMapMarkers } from '../context/MapMarkersContext'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, closestCorners } from '@dnd-kit/core'

const ListMarkers = () => {
  const { markers, legs, handleDragEnd } = useMapMarkers()

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {markers.length > 0 && (
          <div className='bg-backgraound-admin p-2 overflow-auto mb-6 max-h-[60vh] border-2 border-black rounded-xl'>
            <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
              {markers.map((marker, index) => (
                <div key={marker.markerId} className='flex flex-col justify-center items-center'>
                  <Mark marker={marker} index={index} />
                  {(markers.length > 1 && index !== markers.length - 1) ? legs[index] && legs[index].distance.text + ' | ' + legs[index].duration.text : ''}
                </div>
              ))}
            </SortableContext>
          </div>
        )}
      </DndContext >
    </>

  )
}

export default ListMarkers
