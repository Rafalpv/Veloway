import { useMapMarkers } from '@user/context/MapMarkersContext'
import { TbExchange } from 'react-icons/tb'

const ChangeOrderButton = () => {
  const { handleChangeOrder } = useMapMarkers()

  return (
    <div >
      <button className='border-2 border-black rounded-xl p-4 bg-slate-400 shadow-boton hover:rounded-full transition-transform' onClick={handleChangeOrder}>
        <TbExchange size={25} />
      </button>
    </div>
  )
}

export default ChangeOrderButton
