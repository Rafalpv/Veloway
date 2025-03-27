import { TbHttpDelete } from 'react-icons/tb'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const DeletAllMarks = () => {
  const { handleDeleteAll } = useMapMarkers()

  return (
    <button className='border-2 border-black rounded-xl p-4 hover:bg-slate-400 shadow-boton' onClick={handleDeleteAll}>
      <TbHttpDelete size={24} />
    </button>
  )
}

export default DeletAllMarks
