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
    <div className="flex flex-col justify-between rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark p-4 shadow-sm hover:shadow-lg transition-all space-y-4">

      {/* Header */}
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark leading-snug">{route.name}</h2>

        {isComunnity && (
          <button
            onClick={isFav ? () => unsaveCommunityRoute(route._id) : () => saveComunnityRoute(route._id)}
            className="text-sm text-primary-light dark:text-primary-dark hover:underline"
          >
            {isFav ? <FaBookmark size={22} className="text-yellow-400" /> : 'Guardar'}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
        {formatearTiempo(route.time) && <span>{formatearTiempo(route.time)}</span>}
        {formatearDistancia(route.distance) && <span>· {formatearDistancia(route.distance)}</span>}
        {calcularDesnivel(route.elevation).desnivelPositivo && <span>· {calcularDesnivel(route.elevation).desnivelPositivo}</span>}
      </div>

      {/* Etiquetas */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${route.privacity === 'public'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}
        >
          {route.privacity === 'public' ? 'Pública' : 'Privada'}
        </span>

        {(isComunnity || isFav) && (
          <span className="text-xs italic text-gray-500">
            por <span className="font-medium text-black dark:text-white">{route.owner?.nickname || ''}</span>
          </span>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => navigate(`/${userNickname}/${route._id}`)}
          className="text-sm text-primary-light dark:text-primary-dark font-medium hover:underline"
        >
          Ver Detalles
        </button>

        {!isComunnity && (
          <button
            onClick={() => deleteRoute(route._id)}
            className="text-sm text-red-500 hover:underline flex items-center gap-1"
          >
            <CiTrash size={18} />
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}

export default RouteCard
