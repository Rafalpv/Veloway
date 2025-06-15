import { useState } from 'react'
import { useMarkersContext } from '../pages/CreateRoute'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import SaveRouteButton from './SaveRouteButton'
import MarkersManagementMenu from './MarkersManagementeMenu'
import DisplayAsideButton from './DisplayButton'
import GoogleMapComponent from './GoogleMap'
import LevelRecomendation from './LevelRecomendation'

const Map = () => {
  const { listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible, chatVisible, setChatVisible } = useMarkersContext()
  const [isMaximized, setIsMaximized] = useState(false)

  const toggleFullscreen = () => {
    if (!isMaximized) {
      document.querySelector('.map')?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsMaximized(!isMaximized)
  }

  return (
    <div className='map relative transition-all duration-300 overflow-hidden w-full m-2 border-2 border-black'>
      <GoogleMapComponent />

      <MarkersManagementMenu />
      <SaveRouteButton />

      <button className='absolute bottom-4 left-4 z-[500] bg-white p-4 rounded-full shadow-lg hover:bg-gray-200 transition' onClick={toggleFullscreen}>
        {isMaximized ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
      </button>

      <DisplayAsideButton isVisible={listVisible} setIsVisible={setListVisible} position={'top-1/2 left-2  -translate-y-1/2'} direction={'right'} />
      <DisplayAsideButton isVisible={chatVisible} setIsVisible={setChatVisible} position={'top-1/2 right-2 -translate-y-1/2'} direction={'left'} />
      <DisplayAsideButton isVisible={elevationSiderVisible} setIsVisible={setElevationSiderVisible} position={'left-1/2 bottom-2 -translate-x-1/2'} direction={'up'} />

      <LevelRecomendation />

    </div >
  )
}

export default Map
