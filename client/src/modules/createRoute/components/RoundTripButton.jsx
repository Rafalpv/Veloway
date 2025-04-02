import { TfiExchangeVertical } from 'react-icons/tfi'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const RoundTripButton = () => {
  const { isRoundTrip, setIsRoundTrip } = useMapMarkers()

  return (
    <div>
      <button className={`border-2 border-black rounded-full p-4 bg-white shadow-boton ${isRoundTrip ? 'bg-greenButton' : ''} `} onClick={() => setIsRoundTrip(!isRoundTrip)} >
        <TfiExchangeVertical size={25} />
      </button >
    </div>
  )
}

export default RoundTripButton
