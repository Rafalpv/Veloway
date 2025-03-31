import React from 'react'
import { MapMarkersProvider } from '@user/context/MapMarkersContext'
import Map from '@user/components/Map'
import ListMarcadores from '@user/components/ListMarcadores'

const CreateRoute = () => {
  return (
    <MapMarkersProvider>
      <div className='flex h-screen'>
        <ListMarcadores />
        <Map />
      </div>
    </MapMarkersProvider>
  )
}

export default CreateRoute
