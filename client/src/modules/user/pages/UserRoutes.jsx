import { NavLink, useNavigate } from 'react-router'
import { IoAdd } from 'react-icons/io5'
import { useAuth } from '@auth/context/AuthContext'
import { useEffect, useState } from 'react'
import axiosInstance from '@api/axiosInstance'
import { formatearDistancia, formatearTiempo } from '../../utils/functions'

const UserRoutes = () => {
  const { authState, logout } = useAuth()
  const [userRoutes, setUserRoutes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axiosInstance.get(`/routes/user/${authState.user.id_user}`)
        setUserRoutes(response.data.routes ? response.data.routes : [])
      } catch (error) {
        console.error('Error fetching user routes', error)
      }
    }

    fetchRoutes()
  }, [])

  const handleDeleteRoute = async (id) => {
    try {
      await axiosInstance.delete(`/routes/${id}`)
      setUserRoutes((prevRoutes) => prevRoutes.filter((route) => route._id !== id))
    } catch (error) {
      console.error('Error deleting route', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-green-600">
          Bienvenido, {authState.user.nickname} 👋
        </h1>
        <NavLink
          to="create"
          className='flex items-center gap-2 bg-greenButton px-4 py-2 rounded-2xl border-2 border-black hover:bg-green-600 transition-all shadow-md'
        >
          <IoAdd size={28} />
          <span>Crear Ruta</span>
        </NavLink>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* Zona de rutas */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Tus Rutas</h2>

        {/* Aquí irán las tarjetas */}
        {userRoutes.length === 0
          ? (
            <p className="text-gray-500">No tienes rutas creadas aún.</p>)
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userRoutes.map((route, index) => (
                <div
                  key={index}
                  className='flex flex-col bg-slate-200 rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border border-black'
                >
                  {/* Título de la ruta */}
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{route.name}</h3>

                  {/* Info extra */}
                  <div className="flex flex-col gap-2 text-gray-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Duración:</span>
                      <span>{formatearTiempo(route.time) || ''}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Distancia:</span>
                      <span>{formatearDistancia(route.distance) || ''}</span>
                    </div>
                  </div>

                  {/* Botón de ver detalles */}
                  <button onClick={() => navigate(`${userRoutes[index]._id}`)
                  } className='mt-auto bg-greenButton font-semibold px-4 py-2 rounded-xl hover:bg-green-600 transition'>
                    Ver Detalles
                  </button>

                  <button className='mt-auto bg-red-400 font-semibold px-4 py-2 rounded-xl hover:bg-green-600 transition'
                    onClick={() => handleDeleteRoute(route._id)}>
                    Eliminar
                  </button>

                </div>
              ))}
            </div>)}
      </section >
    </div >
  )
}

export default UserRoutes
