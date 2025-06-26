/**
 * RouteCard.jsx
 * RouteCard Component
 *
 * This component represents a card that displays information about a route.
 * It includes functionalities to view route details, delete a route, and toggle the route as a favorite.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.route - The route object containing details about the route.
 * @param {string} props.route.name - The name of the route.
 * @param {number} props.route.time - The time associated with the route.
 * @param {number} props.route.distance - The distance of the route.
 * @param {Object} props.route.elevation - The elevation details of the route.
 * @param {string} props.route._id - The unique identifier of the route.
 * @param {string} props.idUser - The ID of the current user.
 * @param {number} props.index - The index of the route in the list.
 * @param {Array} props.userRoutes - The list of user routes.
 * @param {Function} props.setUserRoutes - Function to update the list of user routes.
 *
 * @returns {JSX.Element} A card displaying route information with options to view details, delete, or toggle favorite status.
 *
 */

import { calcularDesnivel, formatearDistancia, formatearTiempo } from '../../utils/functions'
import { useNavigate } from 'react-router'
import { CiTrash } from 'react-icons/ci'
import { FaBookmark } from 'react-icons/fa'
import { RoutesContext } from '../context/RoutesContext'
import { useContext } from 'react'
import { useAuth } from '@auth/context/AuthContext'
import toast from 'react-hot-toast'

const RouteCard = ({ isComunnity = false, isFav = false, ...props }) => {
  const navigate = useNavigate()
  const { route } = props
  const { deleteRoute, addFavRoute, deleteFavRoute, fetchFavRoutes } = useContext(RoutesContext)
  const { authState } = useAuth()
  const userNickname = authState.user.nickname

  const saveComunnityRoute = async (routeId) => {
    await toast.promise(
      addFavRoute(routeId),
      {
        pending: 'Guardando ruta...',
        success: 'Ruta guardada con éxito!',
        error: 'Error al guardar la ruta.'
      },
      {
        position: 'top-center'
      }
    )
    fetchFavRoutes() // Refresh the favorite routes after saving
  }
  const unsaveCommunityRoute = async (routeId) => {
    await toast.promise(
      deleteFavRoute(routeId),
      {
        pending: 'Eliminando ruta...',
        success: 'Ruta eliminada con éxito!',
        error: 'Error al eliminar la ruta.'
      },
      {
        position: 'top-center'
      }
    )
  }

  return (
    <div
      className='flex flex-col bg-surface-light dark:bg-surface-dark justify-between rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border border-gray-300 dark:border-gray-600'
      onMouseEnter={() => console.log('Mouse entered route card')}
    >
      <div className='flex justify-between'>
        <h3 className='text-3xl font-bold text-primary-light dark:text-primary-dark mb-2'>{route.name}</h3>

        {isComunnity &&
          <button onClick={isFav ? () => unsaveCommunityRoute(route._id) : () => saveComunnityRoute(route._id)}>
            {isFav ? <FaBookmark size={27} className='text-yellow-400' /> : <span className=''>Guardar</span>}
          </button>}
      </div>

      {/* Info */}
      <div className='flex gap-1 text-text-light dark:text-text-dark mb-4 text-sm'>
        <span>{formatearTiempo(route.time) || ''}</span>
        <p> - </p>
        <span>{formatearDistancia(route.distance) || ''}</span>
        <p> - </p>
        <span>{calcularDesnivel(route.elevation).desnivelPositivo || ''}</span>
      </div>

      <div className='flex items-center gap-2'>
        <span
          className={`${route.privacity === 'public' ? 'bg-primary-light' : 'bg-danger-light'} py-0.5 px-2 bg-opacity-70 font-semibold rounded-lg`}
        >
          {route.privacity === 'public' ? 'Pública' : 'Privada'}
        </span>

        {(isComunnity || isFav) && (
          <span className='text-sm italic'>
            por <span className='font-semibold text-black dark:text-white'>{route.owner ? route.owner.nickname : ''}</span>
          </span>
        )}
      </div>

      {/* Botones */}
      <div className='flex gap-2 justify-end'>
        <button
          onClick={() => navigate(`/${userNickname}/${route._id}`)}
          className='bg-button-light dark:bg-button-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition'
        >
          Ver Detalles
        </button>

        {!isComunnity &&
          <button
            onClick={() => deleteRoute(route._id)}
            className='bg-danger-light dark:bg-danger-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition'
          >
            <CiTrash size={25} />
          </button>}

      </div>
    </div>
  )
}

export default RouteCard
