import dotenv from 'dotenv'
import axios from 'axios'
import Route from '../models/Route.js'
import OpenAI from 'openai'
import mongoose from 'mongoose'
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

const getRoutes = async (res) => {
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

const getCommunityRoutes = async (req, res) => {
  const { id } = req.params

  try {
    const communityRoutes = await Route.find({
      'owner.creatorID': { $ne: Number(id) },
      privacity: 'public'
    })

    res.status(200).json({ routes: communityRoutes })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutas de la comunidad', error })
  }
}

const getRoutesPerUser = async (req, res) => {
  try {
    const { id } = req.params

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID de creador no válido' })
    }

    const routes = await Route.find({ 'owner.creatorID': Number(id) })

    return res.status(200).json({
      message: routes.length ? 'Rutas encontradas' : 'No tienes rutas creadas todavía',
      routes
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al obtener la ruta por su ID',
      error: error.message
    })
  }
}

const getRoutesById = async (req, res) => {
  try {
    const { id } = req.params

    // Validar que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    const route = await Route.findById(id)

    if (!route) {
      return res.status(404).json({ message: 'Ruta no encontrada' })
    }

    return res.status(200).json({
      message: 'Ruta encontrada',
      route
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al obtener la ruta por su ID',
      error: error.message
    })
  }
}

const getRoutesByIds = async (req, res) => {
  try {
    const { ids } = req.body

    // Validar que sea un array no vacío
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Se requiere un array de IDs' })
    }

    // Validar que todos los IDs sean ObjectId válidos
    const invalidIds = ids.filter(id => !mongoose.Types.ObjectId.isValid(id))
    if (invalidIds.length > 0) {
      return res.status(400).json({ message: `IDs no válidos: ${invalidIds.join(', ')}` })
    }

    // Buscar todas las rutas cuyos IDs estén en el array
    const routes = await Route.find({ _id: { $in: ids } })

    return res.status(200).json({
      message: 'Rutas encontradas',
      routes
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al obtener las rutas por sus IDs',
      error: error.message
    })
  }
}

const addRoute = async (req, res) => {
  try {
    const { route, routeName, privacity, owner } = req.body

    console.log(owner)

    // Crear una nueva ruta usando la información del objeto `route`
    const newRoute = new Route({
      name: routeName, // Nombre de la ruta
      markers: route.markers, // Marcadores de la ruta
      distance: route.distance, // Distancia
      time: route.time, // Tiempo
      privacity: privacity || 'public', // Privacidad, por defecto 'public'
      steps: route.steps, // Pasos de la ruta
      polyline: route.polyline, // Línea codificada de la ruta
      elevation: route.elevation, // Elevación
      isRoundTrip: route.isRoundTrip, // Si la ruta es de ida y vuelta
      owner
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

const deleteRoute = async (req, res) => {
  const { id } = req.params

  try {
    // Validar que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID no válido' })
    }

    const deletedRoute = await Route.findByIdAndDelete(id)

    if (!deletedRoute) {
      return res.status(404).json({ message: 'Ruta no encontrada' })
    }

    return res.status(200).json({
      message: 'Ruta eliminada correctamente',
      route: deletedRoute
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Hubo un error al eliminar la ruta',
      error: error.message
    })
  }
}

const talkToChat = async (req, res) => {
  const { message } = req.body

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Eres un asistente experto en ciclismo. Tu respuesta debe estar en formato JSON con esta estructura:
          {
            "message": "Respuesta que se mostrará al usuario",
            "locations": [
              { "lat": 37.1761, "lng": -3.5976 },
              ...
            ]
          }
          Si no hay ubicaciones, "locations" será un array vacío. Sé claro y conciso.`
        },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      presence_penalty: 0.3,
      frequency_penalty: 0.2
    })

    const raw = response.choices[0]?.message?.content || '{}'

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (err) {
      console.warn('La respuesta no es JSON válido. Enviando texto crudo.')
      return res.status(200).json({ reply: raw, locations: [] })
    }

    const { message: reply, locations } = parsed
    res.status(200).json({ reply, locations })
  } catch (error) {
    console.error('Error en talkToChat:', error)
    res.status(500).json({ error: error.message })
  }
}

export default {
  calculateRoute,
  getLocations,
  getElevation,
  addRoute,
  deleteRoute,
  getRoutes,
  getRoutesPerUser,
  getRoutesById,
  getRoutesByIds,
  talkToChat,
  getCommunityRoutes
}
