import { createContext, useContext, useState } from 'react'
import { MapMarkersProvider } from '@user/context/MapMarkersContext'
import Map from '@user/components/Map'
import MarkersAside from '@user/components/MarkersAside'
import ElevationAside from '@user/components/ElevationAside'
import ChatAside from '../components/ChatAside'

const MarkersContext = createContext(null)

const useMarkersContext = () => useContext(MarkersContext)

const CreateRoute = () => {
  const [listVisible, setListVisible] = useState(false)
  const [elevationSiderVisible, setElevationSiderVisible] = useState(false)
  const [chatVisible, setChatVisible] = useState(false)

  return (
    <MapMarkersProvider>
      <MarkersContext.Provider value={{ listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible, chatVisible, setChatVisible }}>
        <div className='flex flex-col h-screen font-poppins'>
          <div className='flex flex-1 overflow-hidden'>
            <MarkersAside />
            <Map />
            <ChatAside />
          </div>
          <ElevationAside />
        </div>
      </MarkersContext.Provider>
    </MapMarkersProvider>
  )
}

export { useMarkersContext }
export default CreateRoute
