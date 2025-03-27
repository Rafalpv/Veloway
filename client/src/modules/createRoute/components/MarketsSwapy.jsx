import { useState } from 'react'
import Mark from './Mark'
import ChangeOrderButton from './ChangeOrderButton'
import DeletAllMarks from './DeleteAllMarks'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io'

const MarketsSwapy = ({ markers }) => {
  const [listVisible, setListVisible] = useState(false)

  return (
    <div className={`relative ${listVisible ? 'w-1/4' : 'min-w-16'} bg-neutral-100 border-2 h-screen p-4`}>
      <div className='bg-backgraound-admin p-2  overflow-auto mb-6'>
        <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
          {markers.map((marker, index) => (
            <Mark key={marker.markerId} markerId={marker.markerId} position={marker.position} index={index} />
          ))}
        </SortableContext>
      </div>
      <button className='absolute bottom-1/2 -right-3 border-2 border-black shadow-boton rounded-full' onClick={() => setListVisible(!listVisible)}> {listVisible ? <IoMdArrowDropleft size={35} /> : <IoMdArrowDropright size={35} />} </button>
      <ChangeOrderButton />
      <DeletAllMarks />
    </div >
  )
}

export default MarketsSwapy
