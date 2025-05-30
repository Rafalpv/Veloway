import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '@api/axiosInstance'
import { decode } from '@googlemaps/polyline-codec'

const MapMarkersContext = createContext()

export const MapMarkersProvider = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [position, setPosition] = useState([37.18817, -3.60667])

  const [route, setRoute] = useState({
    markers: [],
    distance: 0,
    time: 0,
    steps: [],
    polyline: [],
    elevation: [],
    isRoundTrip: false
  })

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setRoute((prev) => {
      const oldIndex = prev.markers.findIndex((m) => m.markerId === active.id)
      const newIndex = prev.markers.findIndex((m) => m.markerId === over.id)

      if (oldIndex === -1 || newIndex === -1) return prev

      const updatedMarkers = [...prev.markers]
      const [movedMarker] = updatedMarkers.splice(oldIndex, 1)
      updatedMarkers.splice(newIndex, 0, movedMarker)

      return {
        ...prev,
        markers: updatedMarkers
      }
    })
  }

  const handleChangeOrder = () => {
    setRoute((prev) => {
      const updatedMarkers = [...prev.markers].reverse()
      return {
        ...prev,
        markers: updatedMarkers
      }
    })
  }

  const updateMarkerPosition = (id, newPos) => {
    setRoute((prev) => {
      const updatedMarkers = prev.markers.map((marker) =>
        marker.markerId === id
          ? { ...marker, position: { lat: newPos.lat, lng: newPos.lng } }
          : marker
      )
      return {
        ...prev,
        markers: updatedMarkers
      }
    })
  }

  const handleAddPoint = (markerPosition, option) => {
    const newMarker = { markerId: Date.now(), position: markerPosition }

    const updateByOption = {
      start: [newMarker, ...route.markers.slice(1)],
      end: [...route.markers, newMarker],
      default: [
        ...route.markers.slice(0, -1),
        newMarker,
        route.markers[route.markers.length - 1]
      ]
    }

    setRoute((prev) => ({
      ...prev,
      markers: updateByOption[option] || updateByOption.default
    }))
  }

  const handleDeleteMark = (id) => {
    setRoute((prev) => ({
      ...prev,
      markers: prev.markers.filter((marker) => marker.markerId !== id)
    }))
  }

  const handleDeleteAll = () => {
    setRoute((prev) => ({
      ...prev,
      markers: [],
      distance: 0,
      time: 0,
      steps: [],
      polyline: [],
      elevation: []
    }))
  }

  const handleRouteByChat = (routeData) => {
    setRoute((prev) => ({
      ...prev,
      markers: routeData.map((marker, index) => ({
        markerId: `${Date.now()}-${index}`,
        position: marker
      }))
    }))
  }

  const fetchRoute = async () => {
    if (route.markers.length < 2) return

    try {
      const origin = `${route.markers[0].position.lat},${route.markers[0].position.lng}`
      let waypointsArray = route.markers.slice(1, route.markers.length - 1) // Puntos intermedios

      let destination = `${route.markers[route.markers.length - 1].position.lat},${route.markers[route.markers.length - 1].position.lng}`

      if (route.isRoundTrip) {
        // Si es ida y vuelta, el último punto se convierte en un waypoint
        waypointsArray = [...waypointsArray, { position: route.markers[route.markers.length - 1].position }]
        destination = origin // El destino vuelve a ser el punto de origen
      }

      const waypointsString = waypointsArray
        .map(marker => `${marker.position.lat},${marker.position.lng}`)
        .join('|')

      const response = await axiosInstance.get('/routes/calculate', {
        params: { origin, destination, waypoints: waypointsString }
      })

      const infoRoute = response.data.routes[0]
      const distance = getTotalKms(infoRoute.legs)
      const time = getTotalTime(infoRoute.legs)
      const polyline = decode(infoRoute.overview_polyline.points)

      fetchElevationsShape()

      setRoute((prev) => ({
        ...prev,
        distance,
        time,
        steps: infoRoute.legs,
        polyline: convertToLatLngObjects(polyline)
      }))
    } catch (error) {
      console.error('Error al calcular la ruta', error)
    }
  }

  const getTotalKms = (legs) => legs.reduce((total, leg) => total + leg.distance.value, 0)
  const getTotalTime = (legs) => legs.reduce((total, leg) => total + leg.duration.value, 0)
  const convertToLatLngObjects = coordsArray =>
    coordsArray.map(([lat, lng]) => ({ lat, lng }))

  const fetchElevationsShape = async () => {
    if (route.markers.length < 2) return

    try {
      // Solo enviamos un array de arrays con lat y lng
      const positions = route.markers.map(marker => Object.values(marker.position))

      const response = await axiosInstance.get('/routes/elevation', {
        params: { positions: JSON.stringify(positions) }
      })

      setRoute((prev) => ({
        ...prev,
        elevation: response.data.elevations
      }))
    } catch (error) {
      console.error('Error al obtener elevaciones:', error)
    }
  }

  // Ejecutamos `fetchRoute` cada vez que cambien los marcadores
  useEffect(() => {
    fetchRoute()
  }, [route.markers])

  return (
    <MapMarkersContext.Provider
      value={{
        route,
        setRoute,
        selectedMarker,
        setSelectedMarker,
        handleDragEnd,
        handleDeleteMark,
        handleChangeOrder,
        updateMarkerPosition,
        handleDeleteAll,
        handleAddPoint,
        handleRouteByChat
      }}
    >
      {children}
    </MapMarkersContext.Provider>
  )
}

export const useMapMarkers = () => useContext(MapMarkersContext)
