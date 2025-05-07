import { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import MarkersMangmentButton from './MarkersManagmentButton'

const MarkersManagementMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='absolute top-4 right-1/2 translate-x-1/2 z-[410]'>
      <div className='relative'>
        <button
          onClick={() => setOpen(!open)}
          className='bg-slate-600 p-3 border-2 border-black rounded-full shadow-lg'
        >
          <FaEllipsisH className="text-black text-xl" />
        </button>

        <div
          className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 flex gap-2 bg-white p-3 rounded-lg shadow-xl border border-black transition-all duration-300 ease-in-out ${
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <MarkersMangmentButton option={'changeOrder'} color={'slate'} />
          <MarkersMangmentButton option={'roundTrip'} color={'emerald'} />
          <MarkersMangmentButton option={'deleteAll'} color={'red'} />
        </div>
      </div>
    </div>
  )
}

export default MarkersManagementMenu
