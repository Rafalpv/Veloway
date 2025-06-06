import { useContext } from 'react'
import { RoutesContext } from '../context/RoutesContext'
import RouteCard from '../components/RouteCard'

const UserRoutes = () => {
  const { routes, favRoutes } = useContext(RoutesContext)

  return (
    <>
      <section className='mb-10'>
        <h2 className="text-2xl font-semibold mb-5 text-secondary-light dark:text-secondary-dark">Tus Rutas</h2>

        {routes.length === 0
          ? (
            <p className="text-gray-500 dark:text-gray-400">No tienes rutas creadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {routes.map((route) => (
                <RouteCard route={route} key={route._id} />
              ))}
            </div>)}
      </section>
      <section>
        <h2 className='text-2xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark'>Rutas guardadas</h2>

        {favRoutes.length === 0
          ? (
            <p className="text-gray-500 dark:text-gray-400">No tienes rutas guardadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {favRoutes.map((route) => (
                <RouteCard route={route} key={route._id} isComunnity={true} isFav={true}/>
              ))}
            </div>)}
      </section>
    </>
  )
}

export default UserRoutes
