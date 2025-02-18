import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMapEvents, Polyline, useMap } from 'react-leaflet'
import CustomMarker from './CustomMarker'
import { useMapMarkers } from '../../context/MapMarkersContext'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import LayerButton from './LayerButton'
import axiosInstance from '../../api/axiosInstance'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick })
  return null
}

const Map = () => {
  const { markers, handleMapClick } = useMapMarkers()
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(true)
  const [layer, setLayer] = useState(<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributor" />)
  const [routeCoords, setRouteCoords] = useState([])

  const [position, setPosition] = useState([37.18817, -3.60667])

  const MapViewUpdater = ({ position }) => {
    const map = useMap()
    useEffect(() => {
      map.flyTo(position, 13, { duration: 1.5 })
    }, [position])
    return null
  }

  const handleSearch = async () => {
    if (!city) return
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: city,
          format: 'json',
          limit: 1
        }
      })
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0]
        setPosition([parseFloat(lat), parseFloat(lon)])
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  useEffect(() => {
    const fetchRoute = async () => {
      if (markers.length < 2) return

      try {
        const response = await axiosInstance.get('http://localhost:3000/routes', {
          params: {
            origin: `${markers[0].position[0]},${markers[0].position[1]}`,
            destination: `${markers[markers.length - 1].position[0]},${markers[markers.length - 1].position[1]}`
          }
        })
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    }

    fetchRoute()
  }, [markers])

  return (
    <div className={`relative m-5 border-2 border-black rounded-lg transition-all duration-300 overflow-hidden ${isMaximized ? 'w-full' : 'w-2/3 h-[500px]'}`}>
      {/* Botones y buscador alineados */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-[500]">
        <button
          className='bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition'
          onClick={() => setIsMaximized(!isMaximized)}
        >
          {isMaximized ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
        </button>

        <LayerButton layer={layer} setLayer={setLayer} />

        {/* Buscador */}
        <div className="flex items-center space-x-2 bg-white p-2 rounded shadow-lg">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Introduce una ciudad"
            className="border p-2 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 px-4 py-2 rounded shadow-lg hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Contenedor del mapa */}
      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {layer}
          <ClickHandler onMapClick={handleMapClick} />
          {markers.map((marker, index) => (
            <CustomMarker key={marker.markerId} marker={marker} index={index} />
          ))}
          {routeCoords.length > 0 && (
            <Polyline
              pathOptions={{ color: 'blue', weight: 5 }}
              positions={routeCoords}
            />
          )}
          <MapViewUpdater position={position} />
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
