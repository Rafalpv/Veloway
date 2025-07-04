import { useState, useContext } from 'react'

import { RoutesContext } from '../context/RoutesContext'

const ActivityRow = ({ actividad }) => {
  return (
    <tr
      key={actividad.id}
      className='border-b hover:bg-gray-50 transition-colors'
    >
      <td className='px-4 py-2'>{actividad.nombreRuta}</td>
      <td className='px-4 py-2'>{actividad.distancia}</td>
      <td className='px-4 py-2'>{actividad.tiempo}</td>
      <td className='px-4 py-2'>{actividad.velocidadMedia}</td>
      <td className='px-4 py-2'>{actividad.fecha}</td>
    </tr>
  )
}

const ActivityPage = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { routes, favRoutes } = useContext(RoutesContext)

  const actividades = [
    {
      id: 1,
      nombreRuta: 'Ruta Sierra Nevada',
      distancia: '15 km',
      tiempo: '1h 30m',
      velocidadMedia: '10 km/h',
      fecha: '2025-07-02 10:30'
    },
    {
      id: 2,
      nombreRuta: 'Vía Verde del Aceite',
      distancia: '20 km',
      tiempo: '2h 15m',
      velocidadMedia: '8.9 km/h',
      fecha: '2025-07-01 15:45'
    },
    {
      id: 3,
      nombreRuta: 'Ruta Costera',
      distancia: '12 km',
      tiempo: '1h 10m',
      velocidadMedia: '10.3 km/h',
      fecha: '2025-06-30 09:20'
    }
  ]

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
              <th className="text-left px-4 py-3">Velocidad Media</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Desnivel Positivo</th>
              <th className="text-left px-4 py-3">Desnivel Negativo</th>

            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad) => (
              <ActivityRow key={actividad.id} actividad={actividad} />
            ))}
          </tbody>
        </table>
      </div>

      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Registrar Actividad</h2>

            <form className="space-y-5">

              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                {routes.map((route, index) => (
                  <option key={index} value={route.name}>{route.name}</option>
                ))}
                {favRoutes.map((route, index) => (
                  <option key={index} value={route.name}>{route.name}</option>
                ))}

              </select>

              <div>
                <label className="block mb-1 font-medium">Distancia (km)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="25.6"
                  min={0}

                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Tiempo en movimiento (minutos)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="120"
                  min={0}

                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Velocidad Media (km/h)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="18.5"
                  min={0}
                />
              </div>

              <div className='flex gap-3'>
                <div>
                  <label className="block mb-1 font-medium">Potencia Media (vatios)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="40"
                    min={0}

                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Portencia Máxima (vatios)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="150"
                    min={0}

                  />
                </div>

              </div>

              <div>
                <label className="block mb-1 font-medium">Fecha</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
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

                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Desnivel Negativo (m)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="430"
                    min={0}

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
