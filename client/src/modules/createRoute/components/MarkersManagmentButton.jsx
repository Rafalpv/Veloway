import { TbHttpDelete, TbExchange } from 'react-icons/tb'
import { TfiExchangeVertical } from 'react-icons/tfi'

import { useMapMarkers } from '@user/context/MapMarkersContext'

const MarkersMangmentButton = ({ option, color }) => {
  const { handleDeleteAll, setRoute, handleChangeOrder } = useMapMarkers()

  const selectedFunction = () => {
    if (option === 'deleteAll') {
      handleDeleteAll()
    } else if (option === 'changeOrder') {
      handleChangeOrder()
    } else if (option === 'roundTrip') {
      setRoute((prev) => ({
        ...prev,
        isRoundTrip: !prev.isRoundTrip
      }))
    }
  }

  return (
    <div>
      <button className={'border-2 border-black rounded-full p-3 bg-white hover:bg-slate-300 transition-colors duration-500'} onClick={selectedFunction}>
        {option === 'deleteAll' && <TbHttpDelete size={25} />}
        {option === 'changeOrder' && <TbExchange size={25} />}
        {option === 'roundTrip' && <TfiExchangeVertical size={25} />}
      </button>
    </div>
  )
}

export default MarkersMangmentButton
