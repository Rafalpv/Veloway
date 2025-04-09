import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'

const ElevationAside = () => {
  const { elevationSiderVisible } = useMarkersContext()
  const { fetchElevationsShape } = useMapMarkers()

  return (
    <div className={`relative flex justify-center items-center ${elevationSiderVisible ? 'h-1/4' : 'hidden'} bg-neutral-100`}>
      <button className='m-2 p-2 bg-blue-200 rounded' onClick={fetchElevationsShape}>ELEVATION</button>
    </div>

  )
}

export default ElevationAside
