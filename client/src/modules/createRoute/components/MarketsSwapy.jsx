import { createContext, useContext, useState } from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMapMarkers } from '../context/MapMarkersContext'
import Mark from './Mark'
import ChangeOrderButton from './ChangeOrderButton'
import RoundTripButton from './RoundTripButton'
import DeletAllMarks from './DeleteAllMarks'

const MarkersContext = createContext(null)

const useMarkersContext = () => useContext(MarkersContext)

const MarketsSwapy = ({ markers }) => {
  const [listVisible, setListVisible] = useState(false)
  const { legs } = useMapMarkers()

  return (
    <MarkersContext.Provider value={{ listVisible }}>
      <div className={`relative flex flex-col justify-start ${listVisible ? 'w-1/3' : ''} bg-neutral-100 border-2 h-screen p-4`}>
        {/* Lista de marcadores */}
        {markers.length > 0 &&
          <div className='bg-backgraound-admin p-2 overflow-auto mb-6 max-h-[60vh] border-2 border-black rounded-xl'>
            <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
              {markers.map((marker, index) => (
                <Mark key={marker.markerId} marker={marker} index={index} />
              ))}
            </SortableContext>
          </div>}

        <div>
          {legs.map((leg, index) => {
            return (
              <span key={index}>
                {leg.distance.text}
              </span>
            )
          })}
        </div>

        {/* Contenedor de botones */}
        <div className={`flex ${listVisible ? 'flex-row justify-evenly' : 'flex-col items-center gap-4'} mt-2`}>
          <ChangeOrderButton />
          <RoundTripButton />
          <DeletAllMarks />
        </div>

        {/* Botón para mostrar/ocultar la lista */}
        <button className='absolute top-1/2 -right-5 border-2 border-black rounded-full bg-white shadow-md'
          onClick={() => setListVisible(!listVisible)}>
          <IoMdArrowDropleft size={25} className={`${listVisible ? 'rotate-0' : 'rotate-180'} `} />
        </button>
      </div>
    </MarkersContext.Provider>
  )
}

// 3️⃣ Exportar el componente y el hook del contexto
export { useMarkersContext }
export default MarketsSwapy
