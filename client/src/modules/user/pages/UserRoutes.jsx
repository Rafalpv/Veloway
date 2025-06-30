import { useContext } from 'react'
import { RoutesContext } from '../context/RoutesContext'
import RouteCard from '../components/RouteCard'
import { IoSearchOutline } from 'react-icons/io5'

const UserRoutes = () => {
  const { routes, favRoutes, searchTerm, filterRoutes } = useContext(RoutesContext)

  return (
    <main>
      <section className='mb-10'>
        <div className='flex mb-5 gap-5 justify-between items-center'>

          <h2 className='text-3xl font-semibold text-secondary-light dark:text-secondary-dark'>Tus Rutas</h2>
          <div className='flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-4 py-2 shadow-boton'>
            <IoSearchOutline className='text-2xl text-black' />
            <input
              className='w-full bg-transparent text-xl focus:outline-none'
              type='text'
              placeholder='Buscar...'
              value={searchTerm}
              onChange={(e) => filterRoutes(e.target.value)}
            />
          </div>
        </div>

        {routes.length === 0
          ? (
            <p className='text-gray-500 dark:text-gray-400'>No tienes rutas creadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {routes.map((route) => (
                <RouteCard route={route} key={route._id} />
              ))}
            </div>)}
      </section>
      <section>
        <h2 className='text-3xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark'>Rutas guardadas</h2>

        {favRoutes.length === 0
          ? (
            <p className='text-gray-500 dark:text-gray-400'>No tienes rutas guardadas aún.</p>)
          : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {favRoutes.map((route) => (
                <RouteCard route={route} key={route._id} isComunnity isFav />
              ))}
            </div>)}
      </section>
    </main>

  )
}

export default UserRoutes
