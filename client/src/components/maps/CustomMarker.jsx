import { Marker, Popup } from 'react-leaflet'
import { createNumberIcon } from '../../utils/mapUtils'

const CustomMarker = ({ marker, index }) => {
  return (
    <Marker position={marker.position} icon={createNumberIcon(index + 1)}>
    </Marker>
  )
}

export default CustomMarker
