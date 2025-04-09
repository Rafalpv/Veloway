import dotenv from 'dotenv'
import axios from 'axios'
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

export default {
  calculateRoute,
  getLocations,
  getElevation
}
