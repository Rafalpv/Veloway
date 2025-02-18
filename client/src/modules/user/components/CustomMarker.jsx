import { Marker, Popup } from 'react-leaflet'
import { TiDelete } from 'react-icons/ti'
import { createNumberIcon } from '@user/utils/mapUtils'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const CustomMarker = ({ marker, index }) => {
  const { handleDeleteMark } = useMapMarkers()

  return (
    <Marker position={marker.position} icon={createNumberIcon(index)}>
      <Popup>
        <h3 className='text-lg font-bold'>Marcador {index}</h3>
        <button
          className='relative top-3 right-3 ml-2' // Corrección en el margen
          onClick={(e) => {
            e.stopPropagation() // Evita que el clic en el botón active otros eventos
            handleDeleteMark(marker.markerId)
          }}
        >
          <TiDelete size={30} />
        </button>
      </Popup>
    </Marker>
  )
}

export default CustomMarker
