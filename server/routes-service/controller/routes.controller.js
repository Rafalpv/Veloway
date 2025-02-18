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

export default {
  calculateRoute
}
