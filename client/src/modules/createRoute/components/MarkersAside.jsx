import { useMarkersContext } from '../pages/CreateRoute'
import TimeDistanceInfo from './TimeDistanceInfo'
import ListMarkers from './ListMarkers'

const MarkersAside = () => {
  const { listVisible } = useMarkersContext()

  return (
    <div className={`relative flex flex-col justify-start  ${listVisible ? 'w-1/4' : 'hidden'} bg-neutral-200 border-2 h-auto border-r-black p-4 `}>
      <ListMarkers listVisible={listVisible} />
      <TimeDistanceInfo />
    </div>

  )
}

export default MarkersAside
