import { Marker, Popup } from 'react-leaflet'
import { createIcon } from '@user/utils/mapUtils'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const CustomMarker = ({ marker, index }) => {
  const { selectedMarker, updateMarkerPosition, totalMarkers, isRoundTrip } = useMapMarkers() // Agregar función para actualizar posición

  return (
    <Marker
      position={marker.position}
      icon={createIcon(index, marker.markerId, selectedMarker, totalMarkers, isRoundTrip)}
      draggable={true} // Hacemos que sea arrastrable
      eventHandlers={{
        dragend: (event) => {
          const newPos = event.target.getLatLng() // Obtener la nueva posición
          updateMarkerPosition(marker.markerId, newPos) // Actualizar en el contexto
        }
      }}
    >
      <Popup>
        <h3 className='text-lg font-bold'>Marcador {index}</h3>
      </Popup>
    </Marker>
  )
}

export default CustomMarker
