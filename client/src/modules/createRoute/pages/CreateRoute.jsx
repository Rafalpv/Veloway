import { createContext, useContext, useState } from 'react'
import { MapMarkersProvider } from '@user/context/MapMarkersContext'
import Map from '@user/components/Map'
import ListMarcadores from '@user/components/ListMarcadores'

const MarkersContext = createContext(null)

const useMarkersContext = () => useContext(MarkersContext)

const CreateRoute = () => {
  const [listVisible, setListVisible] = useState(false)

  return (
    <MapMarkersProvider>
      <MarkersContext.Provider value={{ listVisible, setListVisible }}>
        <div className='flex h-screen'>
          <ListMarcadores />
          <Map />
        </div>
      </MarkersContext.Provider >
    </MapMarkersProvider>
  )
}

export { useMarkersContext }
export default CreateRoute
