import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import L from 'leaflet'

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL de la imagen del ícono
  iconSize: [32, 32], // Tamaño del ícono [ancho, alto]
  iconAnchor: [16, 32], // Punto del ícono que se anclará al mapa [x, y]
  popupAnchor: [0, -32] // Punto donde aparecerá el popup [x, y]
})

const startPoint = [37.18817, -3.60667] // Punto inicial (Granada)
const mediunPoint = [37.1821, -3.60367] // Punto inicial (Granada)
const endPoint = [37.166, -3.60] // Punto final

function Routing() {
  const map = useMap() // Obtener la instancia del mapa desde el contexto de React-Leaflet

  React.useEffect(() => {
    if (!map) return

    // Crear el control de rutas
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(startPoint), // Punto inicial
        L.latLng(mediunPoint), // Punto intermedio
        L.latLng(endPoint) // Punto final
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#F47384', weight: 4 }]
      },
      createMarker: function() {
        return null
      }
    }).addTo(map)

    return () => {
      map.removeControl(routingControl) // Limpiar control al desmontar
    }
  }, [map])

  return null
}

function App() {
  return (
    <MapContainer
      center={startPoint}
      zoom={14}
      style={{ height: '98vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={startPoint} icon={customIcon}>
        <Popup>Punto de inicio</Popup>
      </Marker>
      <Marker position={mediunPoint} icon={customIcon}>
        <Popup>Punto de inicio</Popup>
      </Marker>
      <Marker position={endPoint} icon={customIcon}>
        <Popup>Punto de fin</Popup>
      </Marker>
      <Routing />
    </MapContainer>
  )
}

export default App
