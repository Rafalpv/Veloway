import ElevationChart from '../../utils/components/Chart'
import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'

const ElevationAside = () => {
  const { elevationSiderVisible } = useMarkersContext()
  const { route } = useMapMarkers()

  return (
    <div className={`${elevationSiderVisible ? 'h-1/5' : 'hidden'}`}>
      <ElevationChart elevation={route.elevation} totalKms={route.distance / 1000}></ElevationChart>
    </div>
  )
}

export default ElevationAside
