import Mark from './Mark'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const MarketsSwapy = ({ markers }) => {
  return (
    <div className='bg-neutral-100 border-2 h-screen p-4'>
      <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
        {markers.map((marker, index) => (
          <Mark key={marker.markerId} markerId={marker.markerId} position={marker.position} index={index} />
        ))}
      </SortableContext>
      <label htmlFor="">Ida Y vuelta</label>
      <input type="checkbox" name="IdaYvuelta" id="" />
    </div>
  )
}

export default MarketsSwapy
