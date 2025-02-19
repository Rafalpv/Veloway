import Mark from './Mark'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const MarketsSwapy = ({ markers }) => {
  const { selectedMarker } = useMapMarkers()

  return (
    <div className='bg-neutral-100 border-2 h-screen p-4'>
      <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
        {markers.map((marker, index) => (
          <Mark key={marker.markerId} markerId={marker.markerId} position={marker.position} index={index} />
        ))}
      </SortableContext>
    </div>
  )
}

export default MarketsSwapy
