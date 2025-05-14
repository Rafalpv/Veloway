import { GoogleMap, useLoadScript, Marker, Polyline } from '@react-google-maps/api'
import { useCallback, useRef } from 'react'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const centerDefault = {
  lat: 37.1761, // Granada, España
  lng: -3.5976
}

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const { route, handleMapClick, updateMarkerPosition } = useMapMarkers()

  const mapRef = useRef()

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const handleClick = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    handleMapClick(lat, lng)
  }

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerDefault}
      zoom={12}
      onClick={handleClick}
      onLoad={onLoad}
      options={{
        fullscreenControl: false
      }}
    >

      {route.markers.map((marker, index) => {
        return (
          <Marker
            position={marker.position}
            key={`${marker.markerId}`}
            title={`${marker.position.lat} - ${marker.position.lng}`}
            draggable={true}
            onDragEnd={(e) => {
              const newPos = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              }
              updateMarkerPosition(marker.markerId, newPos)
            }}
            icon={{
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="16" fill="#28a745" stroke="black" stroke-width="2"/>
                  <text x="20" y="25" text-anchor="middle" font-size="18" font-weight="bold" fill="white" font-family="Arial">${index + 1}</text>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
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

    </GoogleMap>
  )
}

export default GoogleMapComponent
