import TimeDistanceInfo from './TimeDistanceInfo'
import ListMarkers from './ListMarkers'
import { useMarkersContext } from '../pages/CreateRoute'

const ListMarcadores = () => {
  const { listVisible } = useMarkersContext()

  return (
    <div className={`relative flex flex-col justify-start ${listVisible ? 'w-1/3' : 'hidden'} bg-neutral-200 border-2 border-r-black p-4 h-screen`}>
      <ListMarkers listVisible={listVisible} />
      <TimeDistanceInfo />
    </div>

  )
}

export default ListMarcadores
