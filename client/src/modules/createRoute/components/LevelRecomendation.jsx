/**
 * LevelRecomendation.jsx
 *  En este componente se muestra si la ruta que esta creando el usuairio excede en dificultad
 *  su nivel. Para ello tomaremos los valores de la ruta (distancia, tiempo, pendiente) para determinar si
 *  la ruta es adecuada para el nivel del usuario.
 *
 */
import { useAuth } from '@auth/context/AuthContext'
import { useMapMarkers } from '../context/MapMarkersContext'
import { CiCircleAlert } from 'react-icons/ci'
import { formatearDistancia, formatearTiempo } from '../../utils/functions'

const niveles = {
  beginner: { maxDistancia: 35000, maxTiempo: 5400, maxDesnivel: 500 },
  intermediate: { maxDistancia: 80000, maxTiempo: 10800, maxDesnivel: 1000 },
  advanced: { maxDistancia: Infinity, maxTiempo: Infinity, maxDesnivel: Infinity }
}

const LevelRecomendation = () => {
  const { authState } = useAuth()
  const { user } = authState
  const limites = niveles[user.level]

  const { route } = useMapMarkers()

  const distancia = parseInt(route.distance) // Ejemplo de distancia en km
  const duracion = parseInt(route.time) // Ejemplo de duración en minutos
  const desnivel = 450

  const criterios = [
    {
      nombre: 'Distancia',
      valor: `${distancia}`,
      dentroDeLimite: distancia <= limites.maxDistancia,
      msgWarning: `La distancia máxima recomendada para el nivel ${user.level} es ${formatearDistancia(limites.maxDistancia)}`
    },
    {
      nombre: 'Tiempo',
      valor: `${duracion}`,
      dentroDeLimite: duracion <= limites.maxTiempo,
      msgWarning: `El tiempo máximo recomendado para el nivel ${user.level} es ${formatearTiempo(limites.maxTiempo)}`

    },
    {
      nombre: 'Desnivel',
      valor: `${desnivel}`,
      dentroDeLimite: desnivel <= limites.maxDesnivel,
      msgWarning: `La distancia máxima recomendada para el nivel ${user.level} es ${limites.maxDistancia} km`

    }
  ]

  const warningLevel = criterios.some(c => !c.dentroDeLimite)

  return (
    warningLevel && (
      <div className='absolute top-3 left-[20%] p-2 bg-background-light rounded-2xl w-[20%] shadow-boton'>
        <div className='p-3 rounded-lg bg-red-100 border border-red-300 text-red-800 text-sm'>
          <b> Alerta </b> : Algunos valores superan los límites para el nivel {user.level}. Revisa las recomendaciones sugeridas.
          {criterios.map((criterio, index) =>
            !criterio.dentroDeLimite && (
              <p key={index} className='flex items-center gap-2 mt-1 font-bold text-red-600'>
                <CiCircleAlert size={30} />
                {criterio.msgWarning}
              </p>
            )
          )}
        </div>
      </div>
    )
  )
}

export default LevelRecomendation
