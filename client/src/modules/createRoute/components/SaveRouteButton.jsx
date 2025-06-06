import { useState } from 'react'
import { IoAdd, IoClose } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import axiosInstance from '@api/axiosInstance'
import { useAuth } from '@auth/context/AuthContext'
import { formatearDistancia, formatearTiempo } from '../../utils/functions'
import { useNavigate } from 'react-router'

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
  const [privacity, setPrivacy] = useState('public') // Estado para la privacidad
  const { route } = useMapMarkers()
  const { authState } = useAuth()
  const navigate = useNavigate()

  const handleSave = async () => {
    try {
      setIsModalOpen(false)
      await axiosInstance.post('/routes', { // Enviar los datos directamente en el body
        route, // Datos de la ruta
        routeName, // Nombre de la ruta,
        privacity, // Privacidad de la ruta
        owner: { creatorID: authState.user.id_user, nickname: authState.user.nickname } // Info del usuario
      })
      setRouteName('')
      setPrivacy('public')
      navigate(`/${authState.user.nickname}`)
    } catch (error) {
      console.error('Error al guardar la ruta:', error)
    }
  }

  return (
    <>
      <div className='absolute top-4 right-4 flex gap-2 z-[500]'>
        <button
          className='border-2 border-black rounded-full p-2 bg-[#73b5ba] hover:scale-105'
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={25} className='text-extrabold' />
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1001] font-poppins'>
          <div className='bg-white p-8 rounded-2xl shadow-xl w-[900px] max-h-[90vh] overflow-y-auto relative'>
            <button className='absolute top-4 right-4 text-gray-600 hover:text-black' onClick={() => setIsModalOpen(false)}>
              <IoClose size={24} />
            </button>
            <h2 className='text-2xl font-bold mb-6 text-center'>Guardar Ruta</h2>
            <div className='flex gap-5 w-full'>
              <input
                type='text'
                placeholder='Nombre de la ruta'
                className='w-3/4 border p-3 rounded-lg mb-6 text-md'
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
              />

              {/* Select de privacidad */}
              <select
                className='w-1/4 border p-3 rounded-lg mb-6 text-md bg-primary-dark font-semibold'
                value={privacity}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value='public'>Pública</option>
                <option value='private'>Privada</option>
              </select>
            </div>

            <div className='mb-6 space-y-4'>
              {route.steps.map((leg, index) => (
                <ResumeStepsByLeg leg={leg} key={index} />
              ))}
            </div>

            <div className="flex justify-evenly mb-6 bg-gray-100 p-4 rounded-lg shadow-md">
              <span className="text-lg text-blue-500">Distancia - <span className="text-xl font-bold text-gray-800">{formatearDistancia(route.distance)}</span></span>
              <span className="text-lg text-green-500">Tiempo - <span className="text-lg font-bold text-gray-800">{formatearTiempo(route.time)}</span></span>
            </div>

            <button
              className='w-full bg-greenButton py-3 rounded-lg text-lg font-semibold hover:bg-green-700'
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
