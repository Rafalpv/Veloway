import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'
import { GoArrowUpRight, GoArrowDownRight } from 'react-icons/go'

const TimeDistanceInfo = () => {
  const { totalKms, totalTime, elevations } = useMapMarkers()
  const { listVisible } = useMarkersContext()

  function calcularDesnivel(elevaciones) {
    let desnivelPositivo = 0
    let desnivelNegativo = 0

    for (let i = 1; i < elevaciones.length; i++) {
      const delta = elevaciones[i] - elevaciones[i - 1]
      if (delta > 0) {
        desnivelPositivo += delta
      } else {
        desnivelNegativo += Math.abs(delta)
      }
    }

    return {
      desnivelPositivo: Math.round(desnivelPositivo),
      desnivelNegativo: Math.round(desnivelNegativo)
    }
  }

  return (
    <div className={`flex ${listVisible ? '' : 'flex-col'} items-center justify-evenly gap-8 font-poppins text-lg p-4 bg-white  rounded-xl shadow-lg border border-gray-200`}>
      {/* Distancia */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <RiPinDistanceFill className="text-2xl text-blue-500" />
        <span className="text-blue-600 text-xl">{totalKms} km</span>
      </span>

      {/* Tiempo */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <FcClock className="text-2xl" />
        <span className="text-green-600 text-xl">
          {totalTime.hours > 0 && `${totalTime.hours} h `}
          {totalTime.minutes >= 0 && `${totalTime.minutes} min `}
        </span>
      </span>

      <span className="flex flex-col items-center font-semibold text-gray-700">
        <GoArrowUpRight className="text-2xl" />
        <span className="text-green-600 text-xl">
         {calcularDesnivel(elevations).desnivelPositivo}m
        </span>
      </span>

      <span className="flex flex-col items-center font-semibold text-gray-700">
        <GoArrowDownRight className="text-2xl" />
        <span className="text-green-600 text-xl">
        {calcularDesnivel(elevations).desnivelNegativo}m

        </span>
      </span>
    </div>
  )
}

export default TimeDistanceInfo
