import { TbHttpDelete, TbExchange } from 'react-icons/tb'
import { TfiExchangeVertical } from 'react-icons/tfi'

import { useMapMarkers } from '@user/context/MapMarkersContext'

const MarkersMangmentButton = ({ option, color }) => {
  const { handleDeleteAll, isRoundTrip, setIsRoundTrip, handleChangeOrder } = useMapMarkers()

  const selectedFunction = () => {
    if (option === 'deleteAll') {
      handleDeleteAll()
    } else if (option === 'changeOrder') {
      handleChangeOrder()
    } else if (option === 'roundTrip') {
      setIsRoundTrip(!isRoundTrip)
    }
  }

  return (
    <div>
      <button className={`border-2 border-black rounded-full p-4 bg-${color}-400 hover:bg-${color}-600 shadow-boton transition-colors duration-500`} onClick={selectedFunction}>
        {option === 'deleteAll' && <TbHttpDelete size={25} />}
        {option === 'changeOrder' && <TbExchange size={25} />}
        {option === 'roundTrip' && <TfiExchangeVertical size={25} />}
      </button>
    </div>
  )
}

export default MarkersMangmentButton
