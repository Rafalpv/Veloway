import { useState, useEffect } from 'react'
import axiosInstance from '@api/axiosInstance'
import { useAuth } from '@auth/context/AuthContext'
import ActivityDetails from '../components/ActivityDetails'
import AddActivity from './AddActivity'

// ActivityRow.jsx
const ActivityRow = ({ activity, onSelect }) => {
  const handleRowClick = () => {
    onSelect(activity)
  }

  return (
    <tr
      className='border-b hover:bg-gray-50 transition-colors'
      onClick={handleRowClick}
    >
      <td className='px-4 py-2'>{activity.nameRoute}</td>
      <td className='px-4 py-2'>{activity.distancia}</td>
      <td className='px-4 py-2'>{activity.tiempoMovimiento}</td>
      <td className='px-4 py-2'>{activity.velocidadMedia}</td>
      <td className='px-4 py-2'>{activity.fecha}</td>
    </tr>
  )
}

const ActivityPage = () => {
  const { authState } = useAuth()
  const [activities, setActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  const getActivitiesbyId = async () => {
    try {
      const response = await axiosInstance.get(`/act/${authState.user.id_user}`)
      setActivities(response.data)
    } catch (error) {
      console.error('Error al obtener las actividades:', error)
    }
  }

  useEffect(() => {
    getActivitiesbyId()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Actividad</h1>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-background-blue shadow-md transition"
      >
        Registrar Actividad
      </button>

      <div className="overflow-x-auto mt-4">
        <table className='min-w-full bg-transparent shadow-md overflow-hidden'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th className="text-left px-4 py-3">Ruta</th>
              <th className="text-left px-4 py-3">Distancia</th>
              <th className="text-left px-4 py-3">Tiempo en movimiento</th>
              <th className="text-left px-4 py-3">Desnivel Positivo</th>
              <th className="text-left px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                onSelect={setSelectedActivity}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedActivity && (
        <ActivityDetails
          activity={selectedActivity}
          setShowActivityDetails={() => setSelectedActivity(null)}
        />
      )}

      {showMenu && (
        <AddActivity setShowMenu={setShowMenu} />
      )}
    </div>
  )
}

export default ActivityPage
