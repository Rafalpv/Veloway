import { useState } from 'react'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import { IoSearchOutline } from 'react-icons/io5'
import LayerButton from './LayerButton'
import axiosInstance from '@api/axiosInstance'

const MapButtonsControl = ({ setPosition, setLayer, setSelectedUbication }) => {
  const [searchResults, setSearchResults] = useState([])
  const [city, setCity] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)

  const handleSearch = async () => {
    if (!city.trim()) return
    try {
      const { data } = await axiosInstance.get('http://localhost:3000/routes/locations', {
        params: { ubication: city }
      })
      setSearchResults(data)
    } catch (error) {
      console.error('Error al obtener la ubicación:', error)
    }
  }

  const toggleFullscreen = () => {
    if (!isMaximized) {
      document.querySelector('.map')?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsMaximized(!isMaximized)
  }

  const handleSelectCity = (selectedCity) => {
    setPosition([selectedCity.lat, selectedCity.lon])
    setSelectedUbication([selectedCity.lat, selectedCity.lon])
    setSearchResults([])
    setCity('')
  }

  return (
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
        <button onClick={handleSearch} className='bg-white px-4 py-2 ml-2 rounded-full shadow-lg hover:bg-gray-200  '>
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
  )
}

export default MapButtonsControl
