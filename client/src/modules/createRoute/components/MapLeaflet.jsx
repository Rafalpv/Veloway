import { useEffect } from 'react'
import { MapContainer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import CustomMarker from './CustomMarker'
import 'leaflet/dist/leaflet.css'

const MapLeaflet = ({ selectedUbication, setSelectedUbication, layer }) => {
  const { route, handleMapClick, handleAddSearchPoint, position } = useMapMarkers()

  const MapCenterHandler = ({ position }) => {
    const map = useMap()
    useEffect(() => {
      map.setView(position, 15)
    }, [position, map])
    return null
  }

  const ClickHandler = ({ onMapClick }) => {
    useMapEvents({ click: onMapClick })
    return null
  }

  const handleAddPoint = (e, type) => {
    e.stopPropagation()
    handleAddSearchPoint(selectedUbication, type)
    setSelectedUbication(null)
  }

  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <MapContainer center={position} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        {layer}
        <MapCenterHandler position={position} />
        <ClickHandler onMapClick={handleMapClick} />
        {route.markers.map((marker, index) => (
          <CustomMarker marker={marker} key={marker.markerId} index={index} />
        ))}

        {selectedUbication && (
          <Marker position={selectedUbication}>
            <Popup>
              <div className="flex gap-2 p-2">
                {[
                  { label: 'START POINT', type: 'start', className: 'bg-greenButton' },
                  { label: 'ADD POINT', type: 'add', className: 'bg-blueButton' },
                  !route.isRoundTrip && { label: 'END POINT', type: 'end', className: 'bg-red-500' }
                ].filter(Boolean).map(({ label, type, className }) => (
                  <button
                    key={type}
                    className={`${className} px-4 py-2 rounded shadow-md border-2 border-black`}
                    onClick={(e) => handleAddPoint(e, type)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Popup>
          </Marker>
        )}

        {route.polyline.length > 0 && <Polyline pathOptions={{ color: 'blue', weight: 3, opacity: 0.7 }} positions={route.polyline} />}
      </MapContainer>
    </div>
  )
}

export default MapLeaflet
