import { RoutesContext } from '../context/RoutesContext'
import { useContext, useState } from 'react'
import axiosInstance from '@api/axiosInstance'
import { useAuth } from '@auth/context/AuthContext'

const AddActivity = ({ setShowMenu }) => {
  const { routes, favRoutes } = useContext(RoutesContext)
  const { authState } = useAuth()

  const [activity, setActivity] = useState({
    id_ruta: '',
    nameRoute: '',
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

    if (name === 'id_ruta' && value !== '') {
      routes.forEach(route => {
        if (route._id === value) {
          setActivity({
            ...activity,
            id_ruta: value,
            nameRoute: route.name
          })
        }
      })
      favRoutes.forEach(route => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Registrar Actividad</h2>

        <form className="space-y-5" onSubmit={handleSaveActivity}>
          <div>
            <label className="block mb-1 font-medium">Nombre de la actividad</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Salida matutina por el monte"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              value={activity.nombre}
              onChange={handleChangeActivity}
            />
          </div>

          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            name="id_ruta"
            value={activity.id_ruta || ''} // Asegúrate que pueda estar vacío
            onChange={handleChangeActivity}
          >
            {/* Opción vacía */}
            <option value="">
              🚫 Sin ruta asociada
            </option>

            {/* Rutas normales */}
            {routes.map((route, index) => (
              <option key={`r-${index}`} value={route._id}>
                {route.name}
              </option>
            ))}

            {/* Rutas favoritas */}
            {favRoutes.map((route, index) => (
              <option key={`f-${index}`} value={route._id}>
                {route.name}
              </option>
            ))}
          </select>

          <div>
            <label className="block mb-1 font-medium">Descripción / Notas</label>
            <textarea
              name="descripcion"
              placeholder="Anota aquí cualquier observación o detalle sobre la actividad..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
              value={activity.descripcion}
              onChange={handleChangeActivity}
            ></textarea>
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

          <div className='flex gap-3'>

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

            <div>
              <label className="block mb-1 font-medium">Velocidad Máxima (km/h)</label>
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
  )
}
export default AddActivity
