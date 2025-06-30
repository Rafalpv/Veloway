import { useMapMarkers } from '../context/MapMarkersContext'
import { RiPinDistanceFill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'
import { GoArrowUpRight, GoArrowDownRight } from 'react-icons/go'
import { formatearDistancia, formatearTiempo, calcularDesnivel } from '../../utils/functions'

const InfoRoute = () => {
  const { route } = useMapMarkers()

  return (
    <div className='grid grid-cols-2 gap-5 font-poppins text-lg p-4 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-theme-light dark:border-theme-dark'>

      {/* Distancia */}
      <span className='flex flex-col items-center font-semibold text-text-light dark:text-text-dark'>
        <RiPinDistanceFill className='text-2xl text-background-blue' />
        <span className='text-primary-light dark:text-primary-dark text-xl'>
          {formatearDistancia(route.distance)}
        </span>
      </span>

      {/* Tiempo */}
      <span className='flex flex-col items-center font-semibold text-text-light dark:text-text-dark'>
        <FcClock className='text-2xl' />
        <span className='text-primary-light dark:text-primary-dark text-xl'>
          {formatearTiempo(route.time)}
        </span>
      </span>

      {/* Desnivel positivo */}
      <span className='flex flex-col items-center font-semibold text-text-light dark:text-text-dark'>
        <GoArrowUpRight className='text-2xl' />
        <span className='text-primary-light dark:text-primary-dark text-xl'>
          {calcularDesnivel(route.elevation).desnivelPositivo}
        </span>
      </span>

      {/* Desnivel negativo */}
      <span className='flex flex-col items-center font-semibold text-text-light dark:text-text-dark'>
        <GoArrowDownRight className='text-2xl' />
        <span className='text-primary-light dark:text-primary-dark text-xl'>
          {calcularDesnivel(route.elevation).desnivelNegativo}
        </span>
      </span>

    </div>
  )
}

export default InfoRoute
