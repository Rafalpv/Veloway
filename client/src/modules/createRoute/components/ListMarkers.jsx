import Mark from './Mark'
import { useMapMarkers } from '../context/MapMarkersContext'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, closestCorners } from '@dnd-kit/core'

const ListMarkers = ({ listVisible }) => {
  const { route, handleDragEnd } = useMapMarkers()

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {route.markers.length > 0 && (
          <div className='bg-backgraound-admin p-2 overflow-auto mb-6 border-2 border-black rounded-xl font-poppins text-lg'>
            <SortableContext items={route.markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
              {route.markers.map((marker, index) => (
                <div key={marker.markerId} className='flex flex-col justify-center items-center'>
                  <Mark marker={marker} index={index} />
                  {listVisible ? (route.markers.length > 1 && index !== route.markers.length - 1) ? route.steps[index] && route.steps[index].distance.text + ' | ' + route.steps[index].duration.text : '' : ''}
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
