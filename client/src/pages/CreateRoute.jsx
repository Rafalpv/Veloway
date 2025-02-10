import React from 'react'
import Map from '../components/Map'
import ListMarcadores from '../components/ListMarcadores'
import { MapMarkersProvider } from '../context/MapMarkersContext'

const CreateRoute = () => {
  return (
    <MapMarkersProvider>
      <div className='flex'>
        <ListMarcadores />
        <Map />
      </div>
    </MapMarkersProvider>
  )
}

export default CreateRoute
