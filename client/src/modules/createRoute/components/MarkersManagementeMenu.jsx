import { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
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
      <button className='border-2 border-black rounded-full p-3 bg-white hover:bg-slate-300 transition-colors duration-500' onClick={selectedFunction}>
        {option === 'deleteAll' && <TbHttpDelete size={20} />}
        {option === 'changeOrder' && <TbExchange size={20} />}
        {option === 'roundTrip' && <TfiExchangeVertical size={20} />}
      </button>
    </div>
  )
}

const MarkersManagementMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='absolute top-4 right-1/2 translate-x-1/2 z-[410]'>
      <div className='relative'>
        <button
          onClick={() => setOpen(!open)}
          className='bg-[#73b5ba] p-2 border-2 border-black rounded-full shadow-lg'
        >
          <FaEllipsisH size={20} className='text-black text-xl' />
        </button>

        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 flex gap-2 transition-all duration-500 ease-in-out ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
        >
          <MarkersMangmentButton option='changeOrder' color='slate' />
          <MarkersMangmentButton option='roundTrip' color='emerald' />
          <MarkersMangmentButton option='deleteAll' color='red' />
        </div>
      </div>
    </div>
  )
}

export default MarkersManagementMenu
