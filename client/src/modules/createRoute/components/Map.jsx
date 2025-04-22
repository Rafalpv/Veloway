import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents, Polyline, Marker, Popup } from 'react-leaflet'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import SaveRouteButton from './SaveRouteButton'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import CustomMarker from './CustomMarker'
import LayerButton from './LayerButton'
import MarkersMangmentButton from './MarkersManagmentButton'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import ListMarkers from './ListMarkers'
import { IoMdArrowDropleft } from 'react-icons/io'

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
  const { route, handleMapClick, handleAddSearchPoint, position, setPosition } = useMapMarkers()
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)
  const [layer, setLayer] = useState(
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
  )
  const [selectedUbication, setSelectedUbication] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const { listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible } = useMarkersContext()

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

  const handleAddPoint = (e, type) => {
    e.stopPropagation()
    handleAddSearchPoint(selectedUbication, type)
    setSelectedUbication(null)
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
    <div className='map relative m-4 border-2 border-black transition-all duration-300 overflow-hidden w-full'>
      <div className='absolute top-4 right-1/2 translate-x-1/2 flex gap-4 z-[410]'>
        <MarkersMangmentButton option={'changeOrder'} color={'slate'} />
        <MarkersMangmentButton option={'roundTrip'} color={'emerald'} />
        <MarkersMangmentButton option={'deleteAll'} color={'red'} />
      </div>

      <SaveRouteButton />

      {!listVisible &&
        <div className='absolute top-1/2 -translate-y-1/2 right-5 z-[500]'>
          <ListMarkers />
        </div>}

      {/* Controles */}
      <div className='absolute bottom-4 left-4 flex gap-2 z-[500]'>
        <button className='bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition' onClick={toggleFullscreen}>
          {isMaximized ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
        </button>
        <LayerButton setLayer={setLayer} />

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
      <div className="absolute top-1/2 left-2 z-[500] transform -translate-y-1/2">
        <button
          className='bg-white border-2 border-gray-700 shadow-lg rounded-full p-2 transition-transform duration-300 hover:bg-gray-200 active:scale-95'
          onClick={() => setListVisible(!listVisible)}
        >
          <IoMdArrowDropleft
            size={30}
            className={`text-gray-700 transition-transform duration-300 ${listVisible ? 'rotate-0' : 'rotate-180'
              }`}
          />
        </button>
      </div>

      <div className="absolute left-1/2 bottom-2 z-[500] transform -translate-x-1/2">
        <button
          className='bg-white border-2 border-gray-700 shadow-lg rounded-full p-2 transition-transform duration-300 hover:bg-gray-200 active:scale-95'
          onClick={() => setElevationSiderVisible(!elevationSiderVisible)}
        >
          <IoMdArrowDropleft
            size={30}
            className={`text-gray-700 transition-transform duration-300 ${elevationSiderVisible ? '-rotate-90' : 'rotate-90'
              }`}
          />
        </button>
      </div>

      {/* Mapa */}
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
    </div >
  )
}

export default Map
