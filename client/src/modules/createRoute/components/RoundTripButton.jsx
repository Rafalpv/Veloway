import { TfiExchangeVertical } from 'react-icons/tfi'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const RoundTripButton = () => {
  const { isRoundTrip, setIsRoundTrip } = useMapMarkers()

  return (
    <div>
      <button className={`border-2 border-black rounded-xl p-4 hover:bg-greenButton shadow-boton ${isRoundTrip ? 'bg-greenButton' : ''} `} onClick={() => setIsRoundTrip(!isRoundTrip)} >
        <TfiExchangeVertical size={35} />
      </button >
    </div>
  )
}

export default RoundTripButton
