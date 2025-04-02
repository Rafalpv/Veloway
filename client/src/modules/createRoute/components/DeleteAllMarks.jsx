import { TbHttpDelete } from 'react-icons/tb'
import { useMapMarkers } from '@user/context/MapMarkersContext'

const DeletAllMarks = () => {
  const { handleDeleteAll } = useMapMarkers()

  return (
    <div>
      <button className='border-2 border-black rounded-xl p-4 bg-red-400 shadow-boton' onClick={handleDeleteAll}>
        <TbHttpDelete size={25} />
      </button>
    </div>
  )
}

export default DeletAllMarks
