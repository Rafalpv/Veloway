import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'
import { GoArrowUpRight, GoArrowDownRight } from 'react-icons/go'
import { formatearDistancia, formatearTiempo } from '../../utils/functions'

const TimeDistanceInfo = () => {
  const { route } = useMapMarkers()

  function calcularDesnivel(elevations) {
    let desnivelPositivo = 0
    let desnivelNegativo = 0

    for (let i = 1; i < elevations.length; i++) {
      const delta = elevations[i] - elevations[i - 1]
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
    <div className={'grid grid-cols-2 gap-5 font-poppins text-lg p-4 bg-white rounded-xl shadow-lg border border-gray-200'}>
      {/* Distancia */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <RiPinDistanceFill className="text-2xl text-blue-500" />
        <span className="text-blue-600 text-xl">{formatearDistancia(route.distance)}</span>
      </span>

      {/* Tiempo */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <FcClock className="text-2xl" />
        <span className="text-green-600 text-xl">{formatearTiempo(route.time)}</span>
      </span>

      {/* Desnivel positivo */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <GoArrowUpRight className="text-2xl" />
        <span className="text-green-600 text-xl">
          {calcularDesnivel(route.elevation).desnivelPositivo}m
        </span>
      </span>

      {/* Desnivel negativo */}
      <span className="flex flex-col items-center font-semibold text-gray-700">
        <GoArrowDownRight className="text-2xl" />
        <span className="text-green-600 text-xl">
          {calcularDesnivel(route.elevation).desnivelNegativo}m
        </span>
      </span>
    </div>
  )
}

export default TimeDistanceInfo
