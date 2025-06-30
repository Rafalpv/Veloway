import { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useMapMarkers } from '../context/MapMarkersContext'
import axiosInstance from '@api/axiosInstance'

const SearchLocation = () => {
  const [searchResults, setSearchResults] = useState(['Ubicacion Actual'])
  const [isFocused, setIsFocused] = useState(false)
  const [inputUbication, setInputUbication] = useState('')

  const { setUbication } = useMapMarkers()

  const handleSearch = async () => {
    if (!inputUbication.trim()) return
    try {
      const { data } = await axiosInstance.get('http://localhost:3000/routes/locations', {
        params: { ubication: inputUbication }
      })
      setSearchResults(data)
    } catch (error) {
      console.error('Error al obtener la ubicación')
    }
  }

  useEffect(() => {
    const resetSearch = () => {
      setSearchResults([])
      setInputUbication('')
      setIsFocused(false)
    }

    if (inputUbication === '') resetSearch()
  }, [inputUbication])

  const handleSelectCity = (suggestSelected) => {
    setUbication({ lat: suggestSelected.lat, lng: suggestSelected.lon })
    setSearchResults([])
    setInputUbication('')
  }

  return (
    <div className='flex gap-2 z-[500] w-auto rounded-xl shadow-md items-center border mb-4 bg-surface-light dark:bg-surface-dark border-theme-light dark:border-theme-dark'>

      {/* Barra de búsqueda */}
      <div className='flex-1 relative flex items-center gap-2'>

        <input
          type='text'
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          value={inputUbication}
          onChange={(e) => setInputUbication(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='Buscar ubicación...'
          className='flex-1 p-2 pl-4 pr-10 rounded-lg border border-theme-light dark:border-theme-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition w-full'
        />

        <button
          onClick={handleSearch}
          aria-label='Buscar'
          className='absolute right-3 p-1 text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition'
        >
          <IoSearchOutline size={20} />
        </button>

        {/* Lista de sugerencias cuando no hay resultados */}
        {isFocused && searchResults.length === 0 && (
          <ul className='absolute top-full left-0 w-full mt-2 bg-surface-light dark:bg-surface-dark border border-theme-light dark:border-theme-dark shadow-lg rounded-lg max-h-60 overflow-auto z-50 p-2'>
            <li
              onClick={async () => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords
                      setUbication({ lat: latitude, lng: longitude })
                      setSearchResults([])
                      setInputUbication('')
                    },
                    (error) => {
                      console.error('Error al obtener ubicación actual', error)
                    }
                  )
                } else {
                  console.error('Geolocation no soportada')
                }
              }}
              className='p-2 mb-1 font-semibold text-primary-light dark:text-primary-dark rounded-md transition hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 cursor-pointer'
            >
              🌍 Usar ubicación actual
            </li>
          </ul>
        )}

        {/* Lista de sugerencias cuando hay resultados */}
        {isFocused && searchResults.length > 0 && (
          <ul className='absolute top-full left-0 w-full mt-2 bg-surface-light dark:bg-surface-dark border border-theme-light dark:border-theme-dark shadow-lg rounded-lg max-h-60 overflow-auto z-50 p-2'>
            {searchResults.map((suggest, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(suggest)}
                className='p-2 mb-1 rounded-md text-text-light dark:text-text-dark transition hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 cursor-pointer'
              >
                {suggest.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchLocation
