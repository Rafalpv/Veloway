import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '@api/axiosInstance'
import { decode } from '@googlemaps/polyline-codec'

const MapMarkersContext = createContext()

export const MapMarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [routesPolyline, setRoutesPolyline] = useState([]) // Estado para almacenar la ruta calculada
  const [legs, setLegs] = useState([])
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [position, setPosition] = useState([37.18817, -3.60667])

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng
    setMarkers((prev) => [...prev, { markerId: Date.now(), position: [lat, lng] }])
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    setMarkers((prev) => {
      const oldIndex = prev.findIndex((m) => m.markerId === active.id)
      const newIndex = prev.findIndex((m) => m.markerId === over.id)

      if (oldIndex === -1 || newIndex === -1) return prev

      const updatedMarkers = [...prev]
      const [movedMarker] = updatedMarkers.splice(oldIndex, 1)
      updatedMarkers.splice(newIndex, 0, movedMarker)

      return updatedMarkers
    })
  }

  const handleChangeOrder = () => {
    setMarkers((prev) => {
      const updatedMarkers = [...prev]
      updatedMarkers.reverse()
      return updatedMarkers
    })
  }

  const updateMarkerPosition = (id, newPos) => {
    setMarkers((prev) =>
      prev.map((marker) =>
        marker.markerId === id ? { ...marker, position: [newPos.lat, newPos.lng] } : marker
      )
    )
  }

  const handleAddStartPoint = (markerPosition, option) => {
    switch (option) {
      case 'start':
        setMarkers((prev) => [{ markerId: Date.now(), position: markerPosition }, ...prev.slice(1)])
        break
      case 'end':
        setMarkers((prev) => [...prev, { markerId: Date.now(), position: markerPosition }])
        break
      default:
        setMarkers((prev) => [
          ...prev.slice(0, prev.length - 1),
          { markerId: Date.now(), position: markerPosition },
          prev[prev.length - 1]
        ])
        break
    }
  }

  const handleDeleteMark = (id) => {
    setMarkers((prev) => prev.filter((marker) => marker.markerId !== id))
  }

  const handleDeleteAll = () => {
    setMarkers([])
    setLegs([])
    setRoutesPolyline([])
  }

  // Función para obtener la ruta desde el backend
  const fetchRoute = async () => {
    if (markers.length < 2) return

    try {
      const origin = `${markers[0].position[0]},${markers[0].position[1]}`
      let waypointsArray = markers.slice(1, markers.length - 1) // Puntos intermedios

      let destination = `${markers[markers.length - 1].position[0]},${markers[markers.length - 1].position[1]}`

      if (isRoundTrip) {
        // Si es ida y vuelta, el último punto se convierte en un waypoint
        waypointsArray = [...waypointsArray, { position: markers[markers.length - 1].position }]
        destination = origin // El destino vuelve a ser el punto de origen
      }

      const waypointsString = waypointsArray
        .map(marker => `${marker.position[0]},${marker.position[1]}`)
        .join('|')

      const response = await axiosInstance.get('/routes', {
        params: { origin, destination, waypoints: waypointsString }
      })

      setLegs(response.data.routes[0].legs)

      const dataDecode = decode(response.data.routes[0].overview_polyline.points)
      setRoutesPolyline(dataDecode)
    } catch (error) {
      console.error('Error fetching route:', error)
    }
  }

  // Ejecutamos `fetchRoute` cada vez que cambien los marcadores
  useEffect(() => {
    fetchRoute()
  }, [])

  return (
    <MapMarkersContext.Provider
      value={{
        markers,
        selectedMarker,
        setSelectedMarker,
        totalMarkers: markers.length - 1,
        legs,
        routesPolyline,
        handleMapClick,
        handleDragEnd,
        handleDeleteMark,
        handleChangeOrder,
        updateMarkerPosition,
        handleDeleteAll,
        isRoundTrip,
        setIsRoundTrip,
        handleAddStartPoint,
        position,
        setPosition
      }}
    >
      {children}
    </MapMarkersContext.Provider>
  )
}

export const useMapMarkers = () => useContext(MapMarkersContext)
