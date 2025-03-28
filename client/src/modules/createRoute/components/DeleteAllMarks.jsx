import { TbHttpDelete } from 'react-icons/tb'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const DeletAllMarks = () => {
  const { handleDeleteAll } = useMapMarkers()

  return (
    <div>
      <button className='border-2 border-black rounded-xl p-4 hover:bg-red-400 shadow-boton' onClick={handleDeleteAll}>
        <TbHttpDelete size={35} />
      </button>
    </div>
  )
}

export default DeletAllMarks
