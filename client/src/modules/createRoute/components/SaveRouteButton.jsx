import { useState } from 'react'
import { IoAdd, IoClose } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import TimeDistanceInfo from './TimeDistanceInfo'

import { useMapMarkers } from '@user/context/MapMarkersContext'

const ResumeStepsByLeg = ({ leg, index }) => {
  const [infoSteps, setInfoSteps] = useState(false)

  return (
    <div key={index} className="p-4 border rounded-lg bg-gray-100 shadow-md">
      {/* Encabezado con la flecha alineada a la derecha */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-md font-semibold text-gray-800">
            {leg.start_address} → {leg.end_address}
          </p>
          <p className="text-sm text-gray-600">
            {leg.distance.text} | {leg.duration.text}
          </p>
        </div>
        <MdOutlineKeyboardArrowDown
          size={30}
          className={`cursor-pointer transition-transform ${infoSteps ? 'rotate-180' : ''
            }`}
          onClick={() => setInfoSteps(!infoSteps)}
        />
      </div>

      {/* Lista de pasos con animación */}
      {infoSteps && (
        <ul className="mt-3 bg-white p-3 rounded-md shadow-md border border-gray-200">
          {leg.steps.map((step, stepIndex) => (
            <li key={stepIndex} className="text-sm text-gray-700 mb-1 border-l-4 border-blue-500 pl-2">
              {step.html_instructions.replace(/<[^>]+>/g, '')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

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
          className='border-2 border-black rounded-full p-2 bg-greenButton'
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={38} />
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
                <ResumeStepsByLeg leg={leg} key={index} />
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
