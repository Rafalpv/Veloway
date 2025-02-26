import { TfiExchangeVertical } from 'react-icons/tfi'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const ChangeOrderButton = () => {
  const { handleChangeOrder } = useMapMarkers()

  return (
    <button className='border-2 border-black rounded-xl p-4 hover:bg-slate-400 shadow-boton' onClick={handleChangeOrder}>
      <TfiExchangeVertical size={24} />
    </button>
  )
}

export default ChangeOrderButton
