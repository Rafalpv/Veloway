import { useState } from 'react'
import { TileLayer } from 'react-leaflet'
import { useMapMarkers } from '@user/context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'
import SaveRouteButton from './SaveRouteButton'
import MarkersManagementMenu from './MarkersManagementeMenu'
import DisplayAsideButton from './DisplayButton'
import MapButtonsControl from './MapButtonsControl'
import MapLeaflet from './MapLeaflet'

const Map = () => {
  const { setPosition } = useMapMarkers()
  const { listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible, chatVisible, setChatVisible } = useMarkersContext()

  const [selectedUbication, setSelectedUbication] = useState(null)
  const [layer, setLayer] = useState(
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
  )

  return (
    <div className='map relative transition-all duration-300 overflow-hidden w-full'>
      <MarkersManagementMenu />
      <SaveRouteButton />

      <MapButtonsControl setPosition={setPosition} setLayer={setLayer} setSelectedUbication={setSelectedUbication} />

      <DisplayAsideButton setter={listVisible} functionSet={setListVisible} position={'top-1/2 left-2  -translate-y-1/2'} direction={'right'} />
      <DisplayAsideButton setter={chatVisible} functionSet={setChatVisible} position={'top-1/2 right-2 -translate-y-1/2'} direction={'left'} />
      <DisplayAsideButton setter={elevationSiderVisible} functionSet={setElevationSiderVisible} position={'left-1/2 bottom-2 -translate-x-1/2'} direction={'up'} />

      <MapLeaflet selectedUbication={selectedUbication} setSelectedUbication={setSelectedUbication} layer={layer}/>
    </div >
  )
}

export default Map
