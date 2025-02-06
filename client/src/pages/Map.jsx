import React, { useState, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createNumberIcon = (index) => {
  return L.divIcon({
    html: `<div style="
      background-color: #333; 
      color: white; 
      width: 30px; 
      height: 30px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      border: 1px solid yellow;
    ">${index}</div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

// Componente para capturar clics en el mapa
const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick
  })
  return null
}

// Componente marcador
const CustomMarker = ({ marker }) => (
  <Marker position={marker.position} icon={createNumberIcon(marker.index)}>
    <Popup>Marcador #{marker.index}<br />Coordenadas: {marker.position[0].toFixed(5)}, {marker.position[1].toFixed(5)}</Popup>
  </Marker>
)

const Mapa = () => {
  const position = [37.18817, -3.60667]
  const [markers, setMarkers] = useState([])
  const [width, setWidth] = useState(50)

  // Función optimizada para manejar los clics
  const handleMapClick = useCallback((e) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { position: [e.latlng.lat, e.latlng.lng], index: prevMarkers.length + 1 }
    ])
  }, [])

  return (
    <div>
      {/* Contenedor del mapa */}
      <div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: `${width}%` }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Captura clics en el mapa */}
          <ClickHandler onMapClick={handleMapClick} />

          {/* Renderiza los marcadores */}
          {markers.map((marker, index) => (
            <CustomMarker key={index} marker={marker} />
          ))}
        </MapContainer>
      </div>

      {/* Panel de marcadores */}
      <section className="w-1/3 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Marcadores</h2>
        <ul className="space-y-2">
          {markers.map((marker, index) => (
            <li key={index} className="p-2 bg-white rounded shadow">
              <strong>#{index + 1}</strong>: {marker.position[0].toFixed(5)}, {marker.position[1].toFixed(5)}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Mapa
