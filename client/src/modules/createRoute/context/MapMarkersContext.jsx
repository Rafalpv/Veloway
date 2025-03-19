import { createContext, useContext, useState } from 'react'

const MapMarkersContext = createContext()

export const MapMarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [routes, setRoutes] = useState([])

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
    setMarkers((prev) => prev.map((marker) => (marker.markerId === id ? { ...marker, position: [newPos.lat, newPos.lng] } : marker)))
  }

  const handleDeleteMark = (id) => {
    setMarkers((prev) => prev.filter((marker) => marker.markerId !== id))
  }

  const handleDeleteAll = () => {
    setMarkers([])
  }

  return (
    <MapMarkersContext.Provider value={{ markers, selectedMarker, setSelectedMarker, totalMarkers: markers.length - 1, handleMapClick, handleDragEnd, handleDeleteMark, handleChangeOrder, updateMarkerPosition, handleDeleteAll }}>
      {children}
    </MapMarkersContext.Provider>
  )
}

export const useMapMarkers = () => useContext(MapMarkersContext)
