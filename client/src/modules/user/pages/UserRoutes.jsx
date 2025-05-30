import { NavLink, useNavigate } from 'react-router'
import { IoAdd } from 'react-icons/io5'
import { useAuth } from '@auth/context/AuthContext'
import { useEffect, useState } from 'react'
import { calcularDesnivel, formatearDistancia, formatearTiempo } from '../../utils/functions'
import axiosInstance from '@api/axiosInstance'
import ThemeButton from '../../utils/components/ThemeButton'

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
    <div className='min-h-screen p-6 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors font-poppins'>

      {/* Header */}
      <header className='flex flex-wrap justify-between items-center mb-10 pb-5 gap-4 border-b-2 border-black dark:border-white'>
        <h1 className="text-5xl font-bold text-primary-light dark:text-primary-dark">
          {authState.user.nickname} 👋
        </h1>

        <div className='flex items-center gap-4'>
          <NavLink
            to="create"
            className="flex items-center gap-2 bg-button-light dark:bg-button-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all"
          >
            <IoAdd size={24} />
            <span>Crear Ruta</span>
          </NavLink>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-danger-light dark:bg-danger-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all"
          >
            Cerrar Sesión
          </button>

          <ThemeButton />
        </div>
      </header>

      {/* Zona de rutas */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark">Tus Rutas</h2>

        {userRoutes.length === 0
          ? (
            <p className="text-gray-500 dark:text-gray-400">No tienes rutas creadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {userRoutes.map((route, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border border-gray-300 dark:border-gray-600"
                >
                  {/* Título */}
                  <h3 className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">{route.name}</h3>

                  {/* Info */}
                  <div className="flex gap-1 text-text-light dark:text-text-dark mb-4 text-sm">
                    <span>{formatearTiempo(route.time) || ''}</span>
                    <p> - </p>
                    <span>{formatearDistancia(route.distance) || ''}</span>
                    <p> - </p>
                    <span>{calcularDesnivel(route.elevation).desnivelPositivo || ''}</span>

                  </div>

                  {/* Botones */}
                  <div className='flex gap-2 justify-end'>
                    <button
                      onClick={() => navigate(`${userRoutes[index]._id}`)}
                      className="bg-button-light dark:bg-button-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Ver Detalles
                    </button>

                    <button
                      onClick={() => handleDeleteRoute(route._id)}
                      className="bg-danger-light dark:bg-danger-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>)}
      </section>
    </div>
  )
}

export default UserRoutes
