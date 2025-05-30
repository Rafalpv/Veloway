import { useMarkersContext } from '../pages/CreateRoute'
import InfoRoute from './InfoRoute'
import ListMarkers from './ListMarkers'

const MarkersAside = () => {
  const { listVisible } = useMarkersContext()

  return (
    <div className={`relative flex flex-col justify-start  ${listVisible ? 'w-1/4' : 'hidden'} bg-background-light dark:bg-background-dark h-auto border-r-2 border-black p-4 `}>
      <ListMarkers listVisible={listVisible} />
      <InfoRoute />
    </div>

  )
}

export default MarkersAside
