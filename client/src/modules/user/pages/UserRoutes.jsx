import { IoAdd, IoShareSocial } from 'react-icons/io5'
import { useAuth } from '@auth/context/AuthContext'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import axiosInstance from '@api/axiosInstance'
import ThemeButton from '../../utils/components/ThemeButton'
import RouteCard from '../components/RouteCard'

const UserRoutes = () => {
  const { authState, logout } = useAuth()
  const [userRoutes, setUserRoutes] = useState([])
  const [userFavRoutes, setUserFavRoutes] = useState([])

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const responseRoutes = await axiosInstance.get(`/routes/user/${authState.user.id_user}`)
        setUserRoutes(responseRoutes.data.routes ? responseRoutes.data.routes : [])

        const responseFavRoutes = await axiosInstance.get(`/users/favRoutes/${authState.user.id_user}`)
        setUserFavRoutes(responseFavRoutes.data.routes ? responseFavRoutes.data.routes : [])
      } catch (error) {
        console.error('Error fetching user routes', error)
      }
    }

    fetchRoutes()
  }, [])

  return (
    <div className='min-h-screen p-6 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors font-poppins'>

      {/* Header */}
      <header className='flex flex-wrap justify-between items-center mb-10 pb-5 gap-4 border-b-2 border-black dark:border-white'>
        <h1 className="text-5xl font-bold text-primary-light dark:text-primary-dark">
          {authState.user.nickname} 👋
        </h1>

        <div className='flex items-center gap-4'>

          <NavLink
            to="community"
            className="flex items-center gap-2 bg--light dark:bg-secondary-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl shadow transition-all"
          >
            <IoShareSocial size={24} />
            <span>Comunidad</span>
          </NavLink>

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

      {/* Zona de rutas  Favoritas */}
      <section className='mb-7'>
        <h2 className='text-2xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark'>Rutas Guardads</h2>

        {userFavRoutes.length === 0
          ? (
            <p className="text-gray-500 dark:text-gray-400">No tienes rutas guardadas.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {userFavRoutes.map((route, index) => (
                <RouteCard route={route} idUser={authState.user.id_user} index={index} userRoutes={userRoutes} setUserRoutes={setUserRoutes} key={route._id} />
              ))}
            </div>)}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark">Tus Rutas</h2>

        {userRoutes.length === 0
          ? (
            <p className="text-gray-500 dark:text-gray-400">No tienes rutas creadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {userRoutes.map((route, index) => (
                <RouteCard route={route} idUser={authState.user.id_user} index={index} userRoutes={userRoutes} setUserRoutes={setUserRoutes} key={route._id} />
              ))}
            </div>)}
      </section>
    </div>
  )
}

export default UserRoutes
