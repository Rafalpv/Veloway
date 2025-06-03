/**
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
 */
/**
 * RouteCard.jsx
 *
 */

import { calcularDesnivel, formatearDistancia, formatearTiempo } from '../../utils/functions'
import { useNavigate } from 'react-router'
import { CiBookmark, CiTrash } from 'react-icons/ci'
import { FaBookmark } from 'react-icons/fa'
import { useState } from 'react'
import axiosInstance from '@api/axiosInstance'

const RouteCard = (props) => {
  const navigate = useNavigate()
  const { route, idUser, index, userRoutes, setUserRoutes } = props

  const [isFavourite, setIsFavorite] = useState(false)

  const handleDeleteRoute = async (id) => {
    try {
      await axiosInstance.delete(`/routes/${id}`)
      setUserRoutes((prevRoutes) => prevRoutes.filter((route) => route._id !== id))
    } catch (error) {
      console.error('Error deleting route', error)
    }
  }

  const toggleRouteFavorite = async (idRoute, idUser) => {
    try {
      if (!isFavourite) {
        const response = await axiosInstance.post('/users/favRoutes/new', { idRoute, idUser })
        console.log('Ruta añadida a favoritos', response.data)
      } else {
        const response = await axiosInstance.delete('/users/favRoutes/remove', { data: { idRoute, idUser } })
        console.log('Ruta eliminada de favoritos', response.data)
      }
      setIsFavorite(!isFavourite)
    } catch (error) {
      console.error('Error al cambiar el estado de favorito de la ruta', error)
    }
  }

  return (
    <div
      key={index}
      className='flex flex-col bg-surface-light dark:bg-surface-dark justify-between rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border border-gray-300 dark:border-gray-600'
    >
      <div className='flex justify-between'>
        {/* Título */}
        <h3 className='text-3xl font-bold text-primary-light dark:text-primary-dark mb-2'>{route.name}</h3>

        <button onClick={() => toggleRouteFavorite(route._id, idUser)}>
          {isFavourite
            ? (
              <FaBookmark size={27} className="text-yellow-400" />)
            : (
              <CiBookmark size={27} className="text-yellow-400" />)}
        </button>
      </div>

      {/* Info */}
      <div className="flex gap-1 text-text-light dark:text-text-dark mb-4 text-sm">
        <span>{formatearTiempo(route.time) || ''}</span>
        <p> - </p>
        <span>{formatearDistancia(route.distance) || ''}</span>
        <p> - </p>
        <span>{calcularDesnivel(route.elevation).desnivelPositivo || ''}</span>

      </div>

      <div>
        <span className={`${route.privacity === 'public' ? 'bg-primary-light' : 'bg-danger-light'} py-0.5 px-2 bg-opacity-70 font-semibold rounded-lg`}>{route.privacity === 'public' ? 'Pública' : 'Privada'}</span>
      </div>

      {/* Botones */}
      <div className='flex gap-2 justify-end'>
        <button
          onClick={() => navigate(`${userRoutes[index]._id}`)}
          className='bg-button-light dark:bg-button-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition'
        >
          Ver Detalles
        </button>

        <button
          onClick={() => handleDeleteRoute(route._id)}
          className='bg-danger-light dark:bg-danger-dark hover:opacity-90 text-white font-semibold px-4 py-2 rounded-xl transition'
        >
          <CiTrash size={25}/>
        </button>

      </div>
    </div >)
}

export default RouteCard
