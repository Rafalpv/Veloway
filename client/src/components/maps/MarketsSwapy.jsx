import Mark from './Mark'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const MarketsSwapy = ({ markers }) => {
  return (
    <div className='bg-red-400 h-screen p-4'>
      <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
        {markers.map((marker) => (
          <Mark key={marker.markerId} markerId={marker.markerId} position={marker.position} />
        ))}
      </SortableContext>
    </div>
  )
}

export default MarketsSwapy
