import { useState, useContext, useEffect } from 'react'
import { RoutesContext } from '../context/RoutesContext'
import axiosInstance from '@api/axiosInstance'
import { useAuth } from '@auth/context/AuthContext'

const ActivityRow = ({ activity }) => {
  return (
    <tr
      key={activity.id}
      className='border-b hover:bg-gray-50 transition-colors'
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
  const [showMenu, setShowMenu] = useState(false)
  const { routes, favRoutes } = useContext(RoutesContext)
  const { authState } = useAuth()
  const [activities, setActivities] = useState([])
  const [activity, setActivity] = useState({
    id_ruta: routes[0]?._id || '',
    nameRoute: routes[0]?.name || '',
    distancia: '',
    tiempoMovimiento: '',
    velocidadMedia: '',
    potenciaMedia: '',
    potenciaMaxima: '',
    fecha: '',
    desnivelPositivo: '',
    desnivelNegativo: ''
  })

  const handleChangeActivity = (e) => {
    const { name, value } = e.target

    if (name === 'id_ruta') {
      routes.forEach(route => {
        if (route._id === value) {
          setActivity({
            ...activity,
            id_ruta: value,
            nameRoute: route.name
          })
        }
      })
    } else {
      setActivity({
        ...activity,
        [name]: value
      })
    }
  }

  const handleSaveActivity = (e) => {
    e.preventDefault()

    try {
      axiosInstance.post('/act', {
        activity,
        id_user: authState.user.id_user
      })
      setShowMenu(false)
    } catch (error) {
      console.error('Error al guardar la actividad')
    }
  }

  useEffect(() => {
    const getActivitiesbyId = async () => {
      try {
        const response = await axiosInstance.get(`/act/${authState.user.id_user}`)
        setActivities(response.data)
      } catch (error) {
        console.error('Error al obtener las actividades:', error)
      }
    }
    getActivitiesbyId()
  }, [activities])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Actividad</h1>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-background-blue shadow-md transition"
      >
        Registrar Actividad
      </button>

      <div className="overflow-x-auto">
        <table className='min-w-full bg-transparent shadow-md rounde-full overflow-hidden'>
          <thead className='border-b-2 border-black'>
            <tr >
              <th className="text-left px-4 py-3">Ruta</th>
              <th className="text-left px-4 py-3">Distancia</th>
              <th className="text-left px-4 py-3">Tiempo en movimiento</th>
              <th className="text-left px-4 py-3">Desnivel Positivo</th>
              <th className="text-left px-4 py-3">Fecha</th>

            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </tbody>
        </table>
      </div>

      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Registrar Actividad</h2>

            <form className="space-y-5" onSubmit={handleSaveActivity}>

              <select className="w-full border border-gray-300 rounded-lg px-3 py-2"
                name='id_ruta'
                value={activity.id_ruta}
                onChange={handleChangeActivity}
              >
                {routes.map((route, index) => (
                  <option key={index} value={route._id}>{route.name}</option>
                ))}
                {favRoutes.map((route, index) => (
                  <option key={index} value={route._id}>{route.name}</option>
                ))}

              </select>

              <div>
                <label className="block mb-1 font-medium">Distancia (km)</label>
                <input
                  type='number'
                  step='0.1'
                  className='w-full border border-gray-300 rounded-lg px-3 py-2'
                  placeholder='25.6'
                  min={0}
                  name='distancia'
                  value={activity.distancia}
                  onChange={handleChangeActivity}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Tiempo en movimiento (minutos)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="120"
                  min={0}
                  name='tiempoMovimiento'
                  value={activity.tiempoMovimiento}
                  onChange={handleChangeActivity}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Velocidad Media (km/h)</label>
                <input
                  type='number'
                  step="0.1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="18.5"
                  min={0}
                  name='velocidadMedia'
                  value={activity.velocidadMedia}
                  onChange={handleChangeActivity}

                />
              </div>

              <div className='flex gap-3'>
                <div>
                  <label className="block mb-1 font-medium">Potencia Media (vatios)</label>
                  <input
                    type='number'
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="40"
                    min={0}
                    name='potenciaMedia'
                    value={activity.potenciaMedia}
                    onChange={handleChangeActivity}

                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Portencia Máxima (vatios)</label>
                  <input
                    type='number'
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="150"
                    min={0}
                    name='potenciaMaxima'
                    value={activity.potenciaMaxima}
                    onChange={handleChangeActivity}
                  />
                </div>

              </div>

              <div>
                <label className="block mb-1 font-medium">Fecha</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  name='fecha'
                  value={activity.fecha}
                  onChange={handleChangeActivity}
                />
              </div>

              <div className='flex gap-3'>
                <div>
                  <label className="block mb-1 font-medium">Desnivel Positivo (m)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="450"
                    min={0}
                    name='desnivelPositivo'
                    value={activity.desnivelPositivo}
                    onChange={handleChangeActivity}

                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Desnivel Negativo (m)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="430"
                    min={0}
                    name='desnivelNegativo'
                    value={activity.desnivelNegativo}
                    onChange={handleChangeActivity}
                  />
                </div>

              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                  onClick={() => setShowMenu(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div >
      )}

    </div >
  )
}

export default ActivityPage
