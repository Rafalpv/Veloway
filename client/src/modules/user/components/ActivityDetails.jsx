import {
  FaRoute,
  FaClock,
  FaMountain,
  FaCalendarAlt,
  FaTachometerAlt,
  FaInfoCircle
} from 'react-icons/fa'
import { HiOutlineX } from 'react-icons/hi'
import axiosInstance from '@api/axiosInstance'

const ActivityDetails = ({ setShowActivityDetails, activity }) => {
  const handleDeleteActivity = async () => {
    try {
      await axiosInstance.delete(`/act/${activity.id}`)
      setShowActivityDetails(false)
      // Aquí podrías agregar lógica para actualizar la lista de actividades si es necesario
    } catch (error) {
      console.error('Error al eliminar la actividad:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
        {/* Botón de cierre */}
        <button
          onClick={() => setShowActivityDetails(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
          aria-label="Cerrar"
        >
          <HiOutlineX />
        </button>

        {/* Título principal */}
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center border-b pb-2">
          {activity.nameRoute}
        </h2>

        {/* Detalles en grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-base">
          <div className="flex items-center gap-2">
            <FaRoute className="text-blue-600" />
            <span><strong>Distancia:</strong> {activity.distancia} km</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span><strong>Tiempo en movimiento:</strong> {activity.tiempoMovimiento}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-blue-600" />
            <span><strong>Velocidad media:</strong> {activity.velocidadMedia} km/h</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMountain className="text-blue-600" />
            <span><strong>Desnivel positivo:</strong> {activity.desnivelPositivo} m</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            <span><strong>Fecha:</strong> {activity.fecha}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" />
            <span><strong>Duración total:</strong> {activity.tiempoMovimiento}</span>
          </div>
        </div>

        {/* Descripción */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold">
            <FaInfoCircle />
            <span>Descripción</span>
          </div>
          <p className="bg-gray-100 p-4 rounded-md shadow-inner text-gray-800">
            {activity.descripcion || 'Sin descripción'}
          </p>
        </div>

        <button
          onClick={handleDeleteActivity}
          className="mt-6 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
          aria-label="Eliminar Actividad"
        >
          Eliminar Actividad
        </button>
      </div>
    </div>
  )
}

export default ActivityDetails
