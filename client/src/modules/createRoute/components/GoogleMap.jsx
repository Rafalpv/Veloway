import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
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

const GoogleMapComponent = ({ selectedUbication, setSelectedUbication }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const mapRef = useRef()

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const handleClick = (e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setSelectedUbication({ lat, lng })
  }

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedUbication || centerDefault}
      zoom={12}
      onClick={handleClick}
      onLoad={onLoad}
      options={{
        fullscreenControl: false
      }}
    >
      {selectedUbication && (
        <Marker position={selectedUbication} />
      )}
    </GoogleMap>
  )
}

export default GoogleMapComponent
