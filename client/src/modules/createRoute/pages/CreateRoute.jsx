import { createContext, useContext, useState } from 'react'
import { MapMarkersProvider } from '@user/context/MapMarkersContext'
import Map from '@user/components/Map'
import ListMarcadores from '@user/components/ListMarcadores'
import ElevationAside from '@user/components/ElevationAside'

const MarkersContext = createContext(null)

const useMarkersContext = () => useContext(MarkersContext)

const CreateRoute = () => {
  const [listVisible, setListVisible] = useState(false)
  const [elevationSiderVisible, setElevationSiderVisible] = useState(false)

  return (
    <MapMarkersProvider>
      <MarkersContext.Provider value={{ listVisible, setListVisible, elevationSiderVisible, setElevationSiderVisible }}>
        <div className="flex flex-col h-screen">
          <div className="flex flex-1 overflow-hidden">
            <ListMarcadores />
            <Map />
          </div>
          <ElevationAside />
        </div>
      </MarkersContext.Provider >
    </MapMarkersProvider>
  )
}

export { useMarkersContext }
export default CreateRoute
