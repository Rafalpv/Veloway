import React, { useState, useCallback } from 'react'
import MarketSwap from '../components/MarketsSwapy'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { closestCorners, DndContext } from '@dnd-kit/core'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { arrayMove } from '@dnd-kit/sortable'

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

const Mapa = () => {
  const position = [37.18817, -3.60667]
  const [markers, setMarkers] = useState([])

  // Función optimizada para manejar los clics
  const handleMapClick = useCallback((e) => {
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { position: [e.latlng.lat, e.latlng.lng], markerId: prevMarkers.length + 1 }
    ])
  }, [])

  const CustomMarker = ({ marker }) => (
    < Marker position={marker.position} icon={createNumberIcon(getMarkerIndex(marker.markerId) + 1)} >
      <Popup>Pos: #{marker.markerId}<br />Id: {marker.markerId}</Popup>
    </Marker >
  )
  const getMarkerIndex = id => markers.findIndex(marker => marker.markerId === id)

  const handleDragEnd = event => {
    const { active, over } = event
    if (active.id === over.id) return
    setMarkers(markers => {
      const originIndex = getMarkerIndex(active.id)
      const newPos = getMarkerIndex(over.id)

      return arrayMove(markers, originIndex, newPos)
    })
  }

  return (
    <div className='flex h-screen'>
      < div className='flex-1 w-2/3' >
        <MapContainer center={position} zoom={4} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler onMapClick={handleMapClick} />

          {markers.map((marker) => (
            <CustomMarker key={marker.pos} marker={marker} />
          ))}
        </MapContainer>
      </div >
      <div className='w-1/3'>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <MarketSwap markers={markers} />
        </DndContext>
      </div>
    </div >
  )
}

export default Mapa
