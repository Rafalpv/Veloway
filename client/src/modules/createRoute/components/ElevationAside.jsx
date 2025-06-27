import ElevationChart from '../../utils/components/Chart'
import { useMapMarkers } from '../context/MapMarkersContext'
import { useMarkersContext } from '../pages/CreateRoute'

const ElevationAside = () => {
  const { elevationSiderVisible } = useMarkersContext()
  const { route } = useMapMarkers()

  return (
    <div className={`${elevationSiderVisible ? 'h-1/5' : 'hidden'}`}>
      <ElevationChart elevation={route.elevation}></ElevationChart>
    </div>
  )
}

export default ElevationAside
