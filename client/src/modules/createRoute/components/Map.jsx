import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents, Polyline } from 'react-leaflet'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import CustomMarker from './CustomMarker'
import LayerButton from './LayerButton'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

const MapCenterHandler = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(position, 13)
  }, [position, map])
  return null
}

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: onMapClick })
  return null
}

const Map = () => {
  const { markers, handleMapClick, routes } = useMapMarkers()
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(true)
  const [layer, setLayer] = useState(<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributor' />)
  const [position, setPosition] = useState([37.18817, -3.60667])
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    if (!city) return
    try {
      const response = await axios.get('http://localhost:3000/routes/locations', {
        params: { ubication: city }
      })
      setSearchResults(response.data)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity.name)
    setPosition([selectedCity.lat, selectedCity.lon]) // Mueve el mapa a la ciudad seleccionada
    setSearchResults([]) // Oculta la lista después de seleccionar
  }

  return (
    <div className={`relative m-5 border-2 border-black rounded-lg transition-all duration-300 overflow-hidden ${isMaximized ? 'w-full' : 'w-2/3 h-[500px]'}`}>
      <div className="absolute bottom-4 left-4 flex gap-2 z-[500]">
        <button
          className='bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition'
          onClick={() => setIsMaximized(!isMaximized)}
        >
          {isMaximized ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
        </button>

        <LayerButton layer={layer} setLayer={setLayer} />

        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Introduce una ciudad"
            className="border p-2 rounded w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-white px-4 py-2 ml-2 rounded shadow-lg"
          >
            Buscar
          </button>

          {/* Lista de sugerencias */}
          {searchResults.length > 0 && (
            <ul className="absolute bottom-full left-0 w-64 bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
              {searchResults.map((suggest, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectCity(suggest)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggest.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {layer}
          <MapCenterHandler position={position} />
          <ClickHandler onMapClick={handleMapClick} />

          {markers.map((marker, index) => (
            <CustomMarker key={marker.markerId} marker={marker} index={index} />
          ))}

          {routes.length > 0 && (
            <Polyline
              pathOptions={{ color: 'blue', weight: 3, opacity: 0.7 }}
              positions={routes}
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
