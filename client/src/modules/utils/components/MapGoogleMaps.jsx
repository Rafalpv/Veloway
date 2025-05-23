import { GoogleMap, useLoadScript, Polyline, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import axiosInstance from '@api/axiosInstance'
import { useParams } from 'react-router'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const centerDefault = {
  lat: 37.1761, // Granada, España
  lng: -3.5976
}

const MapGoogleMaps = () => {
  const { id } = useParams()

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const mapRef = useRef()
  const [route, setRoute] = useState({})

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axiosInstance.get(`/routes/${id}`)
        setRoute(response.data.route)
      } catch (error) {
        console.error('Error fetching route', error)
      }
    }
    fetchRoute()
  }, [])

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerDefault}
      zoom={12}
      onLoad={onLoad}
      options={{
        fullscreenControl: false,
        draggableCursor: 'crosshair',
        draggingCursor: 'grabbing'
      }}
    >
      {route.markers && route.markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: marker.position.lat, lng: marker.position.lng }}
          />
        )
      })}

      <Polyline
        path={route.polyline}
        options={{
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 7
        }}
      />

    </GoogleMap >
  )
}

export default MapGoogleMaps
