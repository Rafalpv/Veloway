import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL de la imagen del ícono
  iconSize: [32, 32], // Tamaño del ícono [ancho, alto]
  iconAnchor: [16, 32], // Punto del ícono que se anclará al mapa [x, y]
  popupAnchor: [0, -32] // Punto donde aparecerá el popup [x, y]
})

function ClickableMarker() {
  const [position, setPosition] = React.useState(null)

  useMapEvent('click', (e) => {
    console.log(e.latlng)
    setPosition(e.latlng)
  })
  return position === null
    ? null
    : (
      <Marker position={position} icon={customIcon}>
        <Popup>
          Marker is at {position.toString()}
        </Popup>
      </Marker>
      )
}

function App() {
  return (
    <MapContainer center={[37.18817, -3.60667]} zoom={13} style={{ height: '98vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickableMarker />
    </MapContainer>
  )
}

export default App
