import MapGoogleMaps from '../../utils/components/MapGoogleMaps'
import axiosInstance from '@api/axiosInstance'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ElevationChart from '../../utils/components/Chart'
import { formatearDistancia, formatearTiempo } from '../../utils/functions'
import ResumeStepsByLeg from '../../utils/components/ResumeStepByStep'

const RouteDetails = () => {
  const { id } = useParams()
  const [route, setRoute] = useState({})
  const [center, setCenter] = useState()

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axiosInstance.get(`/routes/${id}`)
        setRoute(response.data.route)
        setCenter(response.data.route.markers[0].position)
      } catch (error) {
        console.error('Error fetching route', error)
      }
    }
    fetchRoute()
  }, [])

  return (
    <div className='grid grid-rows-[1fr_auto] grid-cols-2 gap-2  h-[85vh]'>

      {/* Contenido principal (mapa y detalles) */}
      <div className='col-span-2 grid grid-cols-2 gap-2 overflow-hidden'>

        {/* Mapa */}
        <MapGoogleMaps center={center} markers={route.markers} polyline={route.polyline} />

        {/* Detalles de la ruta */}
        <div className='flex flex-col h-full p-2 overflow-y-scroll'>

          <h1 className='text-3xl font-bold text-center mb-4'>{route.name}</h1>
          {route.steps && route.steps.length > 0 && (
            <div className='mb-6 space-y-4 flex-1 '>
              {route.steps.map((leg, index) => (
                <ResumeStepsByLeg leg={leg} key={index} />
              ))}
            </div>
          )}

          {/* Distancia y Tiempo */}
          <div className='flex justify-evenly mb-6 bg-surface-light dark:bg-surface-dark p-4 rounded-lg shadow-md border border-theme-light dark:border-theme-dark'>
            <span className='text-lg text-secondary-light dark:text-secondary-dark'>
              Distancia - <span className='text-xl font-bold text-text-light dark:text-text-dark'>{formatearDistancia(route.distance)}</span>
            </span>
            <span className='text-lg text-primary-light dark:text-primary-dark'>
              Tiempo - <span className='text-lg font-bold text-text-light dark:text-text-dark'>{formatearTiempo(route.time)}</span>
            </span>
          </div>
        </div>

      </div>

      {/* Elevación */}
      <div className='col-span-2'>
        {Array.isArray(route.elevation) && route.elevation.length > 0 && (
          <ElevationChart elevation={route.elevation} totalKms={route.distance / 1000}/>
        )}
      </div>

    </div>
  )
}

export default RouteDetails
