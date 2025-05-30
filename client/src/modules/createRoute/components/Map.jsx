import { useState } from 'react'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import SaveRouteButton from './SaveRouteButton'
import MarkersManagementMenu from './MarkersManagementeMenu'
import DisplayAsideButton from './DisplayButton'
import MapButtonsControl from './MapButtonsControl'
import GoogleMapComponent from './GoogleMap'
import LevelRecomendation from './LevelRecomendation'

const Map = () => {
  const { setPosition } = useMapMarkers()
  const { listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible, chatVisible, setChatVisible } = useMarkersContext()

  const [setSelectedUbication] = useState(null)

  return (
    <div className='map relative transition-all duration-300 overflow-hidden w-full m-2 border-2 border-black'>
      <MarkersManagementMenu />
      <SaveRouteButton />

      <MapButtonsControl setPosition={setPosition} setSelectedUbication={setSelectedUbication} />

      <DisplayAsideButton isVisible={listVisible} setIsVisible={setListVisible} position={'top-1/2 left-2  -translate-y-1/2'} direction={'right'} />
      <DisplayAsideButton isVisible={chatVisible} setIsVisible={setChatVisible} position={'top-1/2 right-2 -translate-y-1/2'} direction={'left'} />
      <DisplayAsideButton isVisible={elevationSiderVisible} setIsVisible={setElevationSiderVisible} position={'left-1/2 bottom-2 -translate-x-1/2'} direction={'up'} />

      <GoogleMapComponent />

      <LevelRecomendation />

    </div >
  )
}

export default Map
