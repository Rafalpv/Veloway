import React from 'react'
import Map from '../components/maps/Map'
import ListMarcadores from '../components/maps/ListMarcadores'
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
