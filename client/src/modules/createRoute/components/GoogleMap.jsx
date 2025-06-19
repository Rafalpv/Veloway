import { GoogleMap, useLoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const containerStyle = {
  width: '100%',
  height: '100%'
}
const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const { route, updateMarkerPosition, handleAddPoint, ubication } = useMapMarkers()
  const [previewMarker, setPreviewMarker] = useState(null)

  const mapRef = useRef()

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  useEffect(() => {
    const previewMarkerPosition = () => {
      setPreviewMarker(ubication)
    }

    previewMarkerPosition()
  }, [ubication])

  const handleClick = (e) => {
    // Ignora si es un POI
    if (e.placeId) { return }

    const newPos = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }

    setPreviewMarker(newPos)
  }

  if (loadError) return <div>Error cargando el mapa</div>
  if (!isLoaded) return <div>Cargando mapa...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={ubication}
      zoom={12}
      onClick={handleClick}
      onLoad={onLoad}
      options={{
        fullscreenControl: false,
        draggableCursor: 'crosshair',
        draggingCursor: 'grabbing'
      }}
    >

      {previewMarker && (
        <Marker
          position={previewMarker}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="16" fill="#FFD700" stroke="#333" stroke-width="2"/>
            </svg>
          `)}`,
            scaledSize: new window.google.maps.Size(24, 24),
            anchor: new window.google.maps.Point(12, 12)
          }}

        >
          <InfoWindow
            position={previewMarker}
            onCloseClick={() => setPreviewMarker(null)}
          >
            <div className='w-56 bg-white rounded-lg shadow-lg p-2 text-sm font-sans'>

              <ul className='space-y-1'>
                <li>
                  <button
                    onClick={() => {
                      // Tu lógica para punto de inicio
                      handleAddPoint({ lat: previewMarker.lat, lng: previewMarker.lng }, 'start')

                      setPreviewMarker(null)
                    }}
                    className='w-full text-left px-3 py-1 rounded hover:bg-blue-100 transition'
                  >
                    ➤ Añadir como punto de inicio
                  </button>
                </li>
                {route.markers.length > 0 && (
                  <li>
                    <button
                      onClick={() => {
                        // Lógica para punto intermedio
                        handleAddPoint({ lat: previewMarker.lat, lng: previewMarker.lng }, '')

                        setPreviewMarker(null)
                      }}
                      className='w-full text-left px-3 py-1 rounded hover:bg-blue-100 transition'
                    >
                      ➕ Añadir como punto intermedio
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      // Lógica para punto final
                      handleAddPoint({ lat: previewMarker.lat, lng: previewMarker.lng }, 'end')
                      setPreviewMarker(null)
                    }}
                    className='w-full text-left px-3 py-1 rounded hover:bg-blue-100 transition'
                  >
                    🏁 Añadir como punto final
                  </button>
                </li>
              </ul>
            </div>
          </InfoWindow>

        </Marker>
      )}

      {
        route.markers.map((marker, index) => {
          return (
            <Marker
              position={marker.position}
              key={`${marker.markerId}`}
              title={`${marker.position.lat} - ${marker.position.lng}`}
              draggable
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
                scaledSize: new window.google.maps.Size(30, 30), // Tamaño final del icono
                anchor: new window.google.maps.Point(15, 15) // Punto central del icono (la mitad de 30x30)
              }}
            />
          )
        })
      }

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
