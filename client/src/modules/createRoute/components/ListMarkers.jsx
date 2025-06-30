import Mark from './Mark'
import { useMapMarkers } from '../context/MapMarkersContext'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { DndContext, closestCorners } from '@dnd-kit/core'

const ListMarkers = () => {
  const { route, handleDragEnd } = useMapMarkers()

  return (
    <>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {route.markers.length > 0
          ? (
            <div className='bg-background-light dark:bg-background-dark p-2 overflow-auto mb-6 border-2 border-theme-light dark:border-theme-dark rounded-xl font-poppins text-lg text-text-light dark:text-text-dark'>
              <SortableContext items={route.markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
                {route.markers.map((marker, index) => (
                  <div key={marker.markerId} className='flex flex-col justify-center items-center'>
                    <Mark marker={marker} index={index} />
                    {(route.markers.length > 1 && index !== route.markers.length - 1)
                      ? (route.steps[index] && `${route.steps[index].distance.text} | ${route.steps[index].duration.text}`)
                      : ''}
                  </div>
                ))}
              </SortableContext>
            </div>)
          : (
            <p className='text-center text-text-light dark:text-text-dark'>
              Añade puntos a tu ruta seleccionando en el mapa o buscando una ubicación
            </p>)}
      </DndContext>
    </>
  )
}

export default ListMarkers
