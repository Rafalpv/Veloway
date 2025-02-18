import { createContext, useContext, useState } from 'react'

const MapMarkersContext = createContext()

export const MapMarkersProvider = ({ children }) => {
  const [markers, setMarkers] = useState([])

  // Agregar marcador en el mapa
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng
    setMarkers((prev) => [...prev, { markerId: Date.now(), position: [lat, lng] }])
  }

  // Drag & Drop: actualizar el orden de los marcadores
  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over || active.id === over.id) return // Si no hay destino o es el mismo, no hacer nada

    setMarkers((prev) => {
      const oldIndex = prev.findIndex((m) => m.markerId === active.id)
      const newIndex = prev.findIndex((m) => m.markerId === over.id)

      if (oldIndex === -1 || newIndex === -1) return prev // Evitar errores si los IDs no existen

      const updatedMarkers = [...prev]
      const [movedMarker] = updatedMarkers.splice(oldIndex, 1) // Quitar el marcador de su posición
      updatedMarkers.splice(newIndex, 0, movedMarker) // Insertarlo en la nueva posición

      return updatedMarkers
    })
  }

  const handleDeleteMark = (id) => {
    setMarkers((prev) => prev.filter((marker) => marker.markerId !== id))
  }

  return (
    <MapMarkersContext.Provider value={{ markers, handleMapClick, handleDragEnd, handleDeleteMark }}>
      {children}
    </MapMarkersContext.Provider>
  )
}

export const useMapMarkers = () => useContext(MapMarkersContext)
