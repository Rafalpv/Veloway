import { useMapMarkers } from '@user/context/MapMarkersContext'
import { GrRevert } from 'react-icons/gr'

const ChangeOrderButton = () => {
  const { handleChangeOrder } = useMapMarkers()

  return (
    <div >
      <button className='border-2 border-black rounded-xl p-4 hover:bg-slate-400 shadow-boton' onClick={handleChangeOrder}>
        <GrRevert size={35} />
      </button>
    </div>
  )
}

export default ChangeOrderButton
