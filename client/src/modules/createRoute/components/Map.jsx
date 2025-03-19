import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents, Polyline, Marker, Popup } from 'react-leaflet'
import { decode } from '@googlemaps/polyline-codec'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import CustomMarker from './CustomMarker'
import LayerButton from './LayerButton'
import axiosInstance from '@api/axiosInstance'
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
  const { markers, handleMapClick } = useMapMarkers()
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(true)
  const [layer, setLayer] = useState(<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributor' />)
  const [routeCoords, setRouteCoords] = useState([])
  const [position, setPosition] = useState([37.18817, -3.60667])
  const [searchMarker, setSearchMarker] = useState(null)

  const handleSearch = async () => {
    if (!city) return
    try {
      const response = await axios.get('http://localhost:3000/routes/locations', {
        params: {
          ubication: city
        }
      })
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0]
        const newPosition = [parseFloat(lat), parseFloat(lon)]
        setPosition(newPosition)
        setSearchMarker(newPosition)
      }
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  useEffect(() => {
    const fetchRoute = async () => {
      if (markers.length < 2) return
      try {
        const waypointsString = markers
          .slice(1, markers.length - 1)
          .map(marker => `${marker.position[0]},${marker.position[1]}`)
          .join('|')

        const response = await axiosInstance.get('http://localhost:3000/routes', {
          params: {
            origin: `${markers[0].position[0]},${markers[0].position[1]}`,
            destination: `${markers[markers.length - 1].position[0]},${markers[markers.length - 1].position[1]}`,
            waypoints: waypointsString
          }
        })

        const dataRoute = response.data.routes[0].legs
        console.log('Ruta:', dataRoute)
        const dataDecode = decode(response.data.routes[0].overview_polyline.points)
        setRouteCoords(dataDecode)
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    }

    fetchRoute()
  }, [])

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

      <div className="absolute top-0 left-0 w-full h-full">
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          {layer}
          <MapCenterHandler position={position} />
          <ClickHandler onMapClick={handleMapClick} />
          {markers.map((marker, index) => (
            <CustomMarker key={marker.markerId} marker={marker} index={index} />
          ))}
          {searchMarker && (
            <Marker position={searchMarker}>
              <Popup>Ubicación buscada</Popup>
            </Marker>
          )}
          {routeCoords.length > 0 && (
            <Polyline
              pathOptions={{ color: 'blue', weight: 3, opacity: 0.7 }}
              positions={routeCoords}
            />
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
