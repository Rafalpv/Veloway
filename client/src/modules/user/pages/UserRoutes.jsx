import { useContext, useState } from 'react'
import { RoutesContext } from '../context/RoutesContext'
import RouteCard from '../components/RouteCard'
import { IoSearchOutline } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'

const UserRoutes = () => {
  const { routes, favRoutes, searchTerm, filterRoutes } = useContext(RoutesContext)
  const [hiddenRouttes, sethiddenRoutes] = useState(false)
  const [hiddenSaveRouttes, sethiddenSaveRoutes] = useState(false)

  return (
    <main className='p-4'>
      <section className='mb-10'>
        <div className='flex mb-5 gap-5 justify-between items-center'>
          <div className='flex justify-center items-center gap-4'>
            <h2 className='text-3xl font-semibold text-secondary-light dark:text-secondary-dark'>Tus Rutas</h2>
            <button onClick={() => { sethiddenRoutes(!hiddenRouttes) }}>
              <IoIosArrowDown size={25} className={`${hiddenRouttes ? 'rotate-180' : ''} text-secondary-light dark:text-secondary-dark`} />
            </button>
          </div>
          <div className='flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-2 py-2 shadow-boton'>
            <IoSearchOutline className='text-xl text-black' />
            <input
              className='bg-transparent focus:outline-none text-gray-800 dark:text-gray-200'
              type='text'
              placeholder='Buscar...'
              value={searchTerm}
              onChange={(e) => filterRoutes(e.target.value)}
            />
          </div>
        </div>
        <div className={hiddenRouttes ? 'hidden' : ''}>

          {routes.length === 0
            ? (
              <p className='text-gray-500 dark:text-gray-400'>No tienes rutas creadas aún.</p>)
            : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {routes.map((route) => (
                  <RouteCard route={route} key={route._id} />
                ))}
              </div>)}
        </div>
      </section>
      <section>
        <div className='flex items-center mb-5 gap-5'>
          <h2 className='text-3xl font-semibold text-secondary-light dark:text-secondary-dark'>Rutas Guardadas</h2>
          <button onClick={() => { sethiddenSaveRoutes(!hiddenSaveRouttes) }}>
            <IoIosArrowDown size={25} className={`${hiddenSaveRouttes ? 'rotate-180' : ''} text-secondary-light dark:text-secondary-dark`} />
          </button>
        </div>

        <div className={hiddenSaveRouttes ? 'hidden' : ''}>

          {favRoutes.length === 0
            ? (
              <p className='text-gray-500 dark:text-gray-400'>No tienes rutas guardadas aún.</p>)
            : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {favRoutes.map((route) => (
                  <RouteCard route={route} key={route._id} isComunnity isFav />
                ))}
              </div>)}
        </div>
      </section>
    </main >

  )
}

export default UserRoutes
