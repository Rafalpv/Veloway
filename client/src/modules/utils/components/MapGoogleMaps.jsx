import { GoogleMap, useLoadScript, Polyline, Marker } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const MapGoogleMaps = ({ center, markers, polyline }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const mapRef = useRef()

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}

      onLoad={onLoad}
      zoom={13}
      center={center}
      options={{
        fullscreenControl: false,
        draggableCursor: 'crosshair',
        draggingCursor: 'grabbing'
      }}
    >
      {markers && markers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={{ lat: marker.position.lat, lng: marker.position.lng }}
          />
        )
      })}

      <Polyline
        path={polyline}
        options={{
          strokeColor: '#0000FF',
          strokeOpacity: 0.8,
          strokeWeight: 7
        }}
      />

    </GoogleMap>
  )
}

export default MapGoogleMaps
