import { createContext, useContext, useEffect, useState } from 'react'
import { IoMdArrowDropleft } from 'react-icons/io'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMapMarkers } from '../context/MapMarkersContext'
import Mark from './Mark'

const MarkersContext = createContext(null)

const useMarkersContext = () => useContext(MarkersContext)

const MarketsSwapy = ({ markers }) => {
  const [listVisible, setListVisible] = useState(false)
  const [totalKms, setTotalKms] = useState(0)
  const [totalTime, setTotalTime] = useState({ seconds: 0, minutes: 0, hours: 0 })
  const { legs } = useMapMarkers()

  const getTotalKms = () => {
    let total = 0
    legs.forEach(leg => {
      total += parseFloat(leg.distance.value) / 1000
    })
    setTotalKms(total.toFixed(2))
  }

  const getTotalTime = () => {
    let totalSeconds = 0
    legs.forEach(leg => {
      totalSeconds += parseFloat(leg.duration.value)
    })
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    setTotalTime({ seconds, minutes, hours })
  }

  useEffect(() => {
    getTotalKms()
    getTotalTime()
  }, [legs])

  return (
    <MarkersContext.Provider value={{ listVisible }}>
      <div className={`relative flex flex-col justify-start ${listVisible ? 'w-1/3' : ''} bg-neutral-100 border-2 h-screen p-4`}>
        {markers.length > 0 &&
          <div className='bg-backgraound-admin p-2 overflow-auto mb-6 max-h-[60vh] border-2 border-black rounded-xl'>
            <SortableContext items={markers.map(marker => marker.markerId)} strategy={verticalListSortingStrategy}>
              {markers.map((marker, index) => (
                <div key={marker.markerId} className='flex flex-col justify-center items-center'>
                  <Mark marker={marker} index={index} />
                  {(markers.length > 1 && index !== markers.length - 1) ? legs[index] && legs[index].distance.text + ' | ' + legs[index].duration.text : ''}
                </div>
              ))}
            </SortableContext>
          </div>}

        <div className={`flex ${listVisible ? '' : 'flex-col'} items-center justify-center gap-8 font-poppins text-lg p-4 bg-white  rounded-xl shadow-lg border border-gray-200`}>
          {/* Distancia */}
          <span className="flex flex-col items-center font-semibold text-gray-700">
            <RiPinDistanceFill className="text-3xl text-blue-500" />
            <span className="text-blue-600 text-xl">{totalKms} km</span>
          </span>

          {/* Tiempo */}
          <span className="flex flex-col items-center font-semibold text-gray-700">
            <FcClock className="text-3xl" />
            <span className="text-green-600 text-xl">
              {totalTime.hours > 0 && `${totalTime.hours} h `}
            {totalTime.minutes >= 0 && `${totalTime.minutes} min `}
          </span>
        </span>
      </div>
      {/* Botón para mostrar/ocultar la lista */}
      <button className='absolute top-1/2 -right-5  border-2 border-black'
        onClick={() => setListVisible(!listVisible)}>
        <IoMdArrowDropleft size={30} className={`${listVisible ? 'rotate-0' : 'rotate-180'} `} />
      </button>
    </div >
    </MarkersContext.Provider >
  )
}

// 3️⃣ Exportar el componente y el hook del contexto
export { useMarkersContext }
export default MarketsSwapy
