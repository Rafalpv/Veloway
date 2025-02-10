import React from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import { useMapMarkers } from '../context/MapMarkersContext' // Usamos el contexto

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick })
  return null
}

const Map = () => {
  const position = [37.18817, -3.60667]
  const { markers, handleMapClick } = useMapMarkers()

  return (
    <div className='m-10 flex-1 border-2 border-black rounded- w-2/3'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={handleMapClick} />

        {markers.map((marker, index) => (
          <CustomMarker key={marker.markerId} marker={marker} index={index} />
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
