import RouteCard from '../components/RouteCard'
import { useContext } from 'react'
import { RoutesContext } from '../context/RoutesContext'

const CommunityRoutes = () => {
  const { communityRoutesRes } = useContext(RoutesContext)
  return (
    <section className='mb-10'>
      <h2 className="text-2xl font-semibold mb-6 text-secondary-light dark:text-secondary-dark">Rutas de la Comunidad</h2>

      {communityRoutesRes.length === 0
        ? (
          <p className="text-gray-500 dark:text-gray-400">No tienes rutas creadas aún.</p>)
        : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {communityRoutesRes.map((route) => (
              <RouteCard route={route} key={route._id} isComunnity={true} />
            ))}
          </div>)}
    </section>
  )
}

export default CommunityRoutes
