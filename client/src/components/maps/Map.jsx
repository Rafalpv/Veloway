import React, { useState } from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import CustomMarker from './CustomMarker'
import { useMapMarkers } from '../../context/MapMarkersContext'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import 'leaflet/dist/leaflet.css'

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick })
  return null
}

const Map = () => {
  const position = [37.18817, -3.60667]
  const { markers, handleMapClick } = useMapMarkers()
  const [isMaximized, setIsMaximized] = useState(true)

  return (
    <div className={`relative m-10 border-2 border-black rounded-lg transition-all duration-300 overflow-hidden ${isMaximized ? 'w-full' : 'w-2/3 h-[500px]'}`}>
      <button
        className="absolute bottom-4 left-4 z-[1000] bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        onClick={() => setIsMaximized(!isMaximized)}
        style={{ zIndex: 1000 }} // Asegurar que esté por encima
      >
        {isMaximized ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
      </button>

      {/* Contenedor del mapa */}
      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', position: 'relative' }}>
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
    </div>
  )
}

export default Map
