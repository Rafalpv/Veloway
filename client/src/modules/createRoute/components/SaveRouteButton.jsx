import { useState } from 'react'
import { IoAdd, IoClose } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

import { useMapMarkers } from '@user/context/MapMarkersContext'

const SaveRouteButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [routeName, setRouteName] = useState('')
  const { legs } = useMapMarkers()

  const handleSave = () => {
    console.log('Legs:', legs)
    setIsModalOpen(false)
    setRouteName('')
  }

  return (
    <>
      <div className='absolute top-4 right-4 flex gap-2 z-[500]'>
        <button
          className='border-2 border-black rounded-xl p-4 shadow-boton bg-greenButton'
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={20} />
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1001] font-poppins'>
          <div className='bg-white p-8 rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto relative'>
            <button className='absolute top-4 right-4 text-gray-600 hover:text-black' onClick={() => setIsModalOpen(false)}>
              <IoClose size={24} />
            </button>
            <h2 className='text-2xl font-bold mb-6 text-center'>Guardar Ruta</h2>
            <input
              type='text'
              placeholder='Nombre de la ruta'
              className='w-full border p-3 rounded-lg mb-6 text-md'
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
            <div className='mb-6 space-y-4'>
              {legs.map((leg, index) => (
                <div key={index} className='p-4 border rounded-lg bg-gray-100'>
                  <p className='text-md font-semibold text-gray-800'>
                    {leg.start_address} → {leg.end_address}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {leg.distance.text} | {leg.duration.text}
                  </p>
                  {/* <ul className='list-disc list-inside text-xs text-gray-700 mt-2'>
                    {leg.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step.instructions.replace(/<[^>]+>/g, '')}</li>
                    ))}
                  </ul> */}
                  <MdOutlineKeyboardArrowDown size={30} />
                </div>
              ))}
            </div>

            <button
              className='w-full bg-greenButton text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700'
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SaveRouteButton
