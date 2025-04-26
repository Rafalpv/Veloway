import dotenv from 'dotenv'
import axios from 'axios'
import Route from '../models/Route.js'
dotenv.config({ path: './routes-service/.env' })

const calculateRoute = async (req, res) => {
  const { origin, destination, waypoints } = req.query

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
      params: {
        origin,
        destination,
        avoid: 'highways',
        mode: 'bicycling',
        waypoints,
        key: process.env.GOOGLE_API_KEY
      }
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocations = async (req, res) => {
  const { ubication } = req.query
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
      params: {
        input: ubication,
        language: 'es',
        key: process.env.GOOGLE_API_KEY
      }
    })

    const suggestions = await Promise.all(
      response.data.predictions.map(async (place) => {
        const details = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: place.place_id,
            fields: 'geometry,formatted_address',
            key: process.env.GOOGLE_API_KEY
          }
        })
        return {
          name: place.description,
          lat: details.data.result.geometry.location.lat,
          lon: details.data.result.geometry.location.lng
        }
      })
    )
    res.json(suggestions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getElevation = async (req, res) => {
  const { positions, samples = 100 } = req.query

  try {
    if (!positions) {
      return res.status(400).json({ error: 'Debes enviar un array de coordenadas' })
    }

    const parsedPositions = JSON.parse(positions)

    // Transformamos a formato "lat,lng|lat2,lng2..."
    const locations = parsedPositions
      .map(([lat, lng]) => `${lat},${lng}`)
      .join('|')

    const response = await axios.get('https://maps.googleapis.com/maps/api/elevation/json', {
      params: {
        path: locations,
        samples,
        key: process.env.GOOGLE_API_KEY
      }
    })

    if (response.data.status !== 'OK') {
      return res.status(500).json({ error: 'Error al obtener elevación', detalles: response.data })
    }

    const elevations = response.data.results.map(result => result.elevation)
    return res.json({ elevations }) // Solo enviamos el array de elevaciones
  } catch (error) {
    console.error('Error en getElevation:', error)
    res.status(500).json({ error: error.message })
  }
}

const getRoutes = async (req, res) => {
  try {
    // Obtener todas las rutas de la base de datos
    const routes = await Route.find() // `Route` es el modelo de tus rutas

    // Verificar si no se encuentran rutas
    if (routes.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron rutas'
      })
    }

    // Responder con las rutas encontradas
    res.status(200).json({
      message: 'Rutas obtenidas correctamente',
      routes
    })
  } catch (error) {
    // Manejar el error
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al obtener las rutas',
      error: error.message
    })
  }
}

const addRoute = async (req, res) => {
  try {
    const { route, routeName, userId } = req.body

    // Crear una nueva ruta usando la información del objeto `route`
    const newRoute = new Route({
      name: routeName, // Nombre de la ruta
      markers: route.markers, // Marcadores de la ruta
      distance: route.distance, // Distancia
      time: route.time, // Tiempo
      steps: route.steps, // Pasos de la ruta
      polyline: route.polyline, // Línea codificada de la ruta
      elevation: route.elevation, // Elevación
      isRoundTrip: route.isRoundTrip, // Si la ruta es de ida y vuelta
      creatorID: userId
    })

    // Guardar la nueva ruta en la base de datos
    await newRoute.save()

    // Responder con un mensaje de éxito
    res.status(201).json({
      message: 'Ruta guardada correctamente',
      route: newRoute
    })
  } catch (error) {
    // Si ocurre un error, responder con un mensaje de error
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al guardar la ruta',
      error: error.message
    })
  }
}

export default {
  calculateRoute,
  getLocations,
  getElevation,
  addRoute,
  getRoutes
}
