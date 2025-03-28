import { useState } from 'react'
import Mark from './Mark'
import ChangeOrderButton from './ChangeOrderButton'
import DeletAllMarks from './DeleteAllMarks'
import RoundTripButton from './RoundTripButton'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io'

const MarketsSwapy = ({ markers }) => {
  const [listVisible, setListVisible] = useState(false)

  return (
    <div className={`relative flex flex-col justify-start ${listVisible ? 'w-1/4' : ''} bg-neutral-100 border-2 h-screen p-4`}>
      {/* Lista de marcadores */}
      {markers.length > 0 &&
        <div className='bg-backgraound-admin p-2 overflow-auto mb-6 max-h-[60vh] border-2 border-black rounded-xl'>
          <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
            {markers.map((marker, index) => (
              <Mark key={marker.markerId} markerId={marker.markerId} position={marker.position} index={index} />
            ))}
          </SortableContext>
        </div>}

      <button className="absolute top-1/2 -right-5 border-2 border-black rounded-full bg-white shadow-md"
        onClick={() => setListVisible(!listVisible)}>
        {listVisible ? <IoMdArrowDropleft size={25} /> : <IoMdArrowDropright size={25} />}
      </button>

      {/* Contenedor de botones con disposición dinámica */}
      <div className={`flex ${listVisible ? 'flex-row justify-between' : 'flex-col items-center gap-4'} mt-2`}>
        <ChangeOrderButton />
        <RoundTripButton />
        <DeletAllMarks />
      </div>
    </div>
  )
}

export default MarketsSwapy
