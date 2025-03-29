import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents, Polyline, Marker, Popup } from 'react-leaflet'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import CustomMarker from './CustomMarker'
import LayerButton from './LayerButton'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

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

const Map = () => {
  const { markers, handleMapClick, routesPolyline, isRoundTrip, handleAddStartPoint } = useMapMarkers()
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)
  const [layer, setLayer] = useState(
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
  )
  const [position, setPosition] = useState([37.18817, -3.60667])
  const [selectedUbication, setSelectedUbication] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    if (!city.trim()) return
    try {
      const { data } = await axios.get('http://localhost:3000/routes/locations', {
        params: { ubication: city }
      })
      setSearchResults(data)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  const handleSelectCity = (selectedCity) => {
    setPosition([selectedCity.lat, selectedCity.lon])
    setSelectedUbication([selectedCity.lat, selectedCity.lon])
    setSearchResults([])
    setCity('')
  }

  const toggleFullscreen = () => {
    if (!isMaximized) {
      document.querySelector('.map')?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsMaximized(!isMaximized)
  }

  return (
    <div className='map relative m-5 border-2 border-black rounded-lg transition-all duration-300 overflow-hidden w-full'>
      {/* Controles */}
      <div className='absolute bottom-4 left-4 flex gap-2 z-[500]'>
        <button className='bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition' onClick={toggleFullscreen}>
          {isMaximized ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
        </button>
        <LayerButton layer={layer} setLayer={setLayer} />

        {/* Barra de búsqueda */}
        <div className='relative flex'>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Introduce una ciudad'
            className='border p-2 rounded-3xl w-64'
          />
          <button onClick={handleSearch} className='bg-white px-4 py-2 ml-2 rounded-full shadow-lg'>
            <IoSearchOutline size={24} />
          </button>
          {/* Lista de sugerencias */}
          {searchResults.length > 0 && (
            <ul className='absolute bottom-full left-0 w-64 bg-white border border-gray-300 shadow-lg rounded-3xl mt-1 max-h-60 overflow-auto'>
              {searchResults.map((suggest, index) => (
                <li key={index} onClick={() => handleSelectCity(suggest)} className='p-2 cursor-pointer hover:bg-gray-100'>
                  {suggest.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <MapContainer center={position} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          {layer}
          <MapCenterHandler position={position} />
          <ClickHandler onMapClick={handleMapClick} />
          {markers.map((marker, index) => (
            <CustomMarker marker={marker} key={marker.markerId} index={index} />
          ))}

          {selectedUbication && (
            <Marker position={selectedUbication} draggable={true}>
              <Popup>
                <div className="flex gap-2 p-2">
                  <button className="bg-blue-500 bg-greenButton border-2 border-black px-4 py-2 rounded shadow-md "
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddStartPoint(selectedUbication)
                      setSelectedUbication(null)
                    }}>
                    START POINT
                  </button>
                  <button className='bg-blueButton text-white px-4 py-2 rounded shadow-md border-2 border-black '>
                    ADD POINT
                  </button>
                  {!isRoundTrip &&
                    <button className="bg-red-500 text-white px-4 py-2 rounded shadow-md border-2 border-black ">
                      END POINT
                    </button>
                  }
                </div>
              </Popup>
            </Marker>
          )}

          {routesPolyline.length > 0 && <Polyline pathOptions={{ color: 'blue', weight: 3, opacity: 0.7 }} positions={routesPolyline} />}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
