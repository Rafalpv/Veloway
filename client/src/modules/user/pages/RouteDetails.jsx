import MapGoogleMaps from '../../utils/components/MapGoogleMaps'
import axiosInstance from '@api/axiosInstance'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

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
    <div className="grid grid-rows-[1fr_auto] grid-cols-2 gap-2 h-[85vh]">

      {/* Contenido principal (mapa y detalles) */}
      <div className="col-span-2 grid grid-cols-2 gap-2">

        <MapGoogleMaps center={center} markers={route.markers} polyline={route.polyline} />

        {/* Detalles de la ruta */}
        <div className="flex flex-col justify-center p-2">
          <h1 className="text-3xl font-bold text-center mb-4">{route.name}</h1>

        </div>

      </div>

      {/* Elevación */}
      <div className="col-span-2 border-t">
        <div className="h-32 bg-gray-200 flex items-center justify-center">
          Gráfico Elevación Placeholder
        </div>
      </div>

    </div>
  )
}

export default RouteDetails
