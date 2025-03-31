import { useState } from 'react'
import { FiLayers } from 'react-icons/fi'
import { TileLayer } from 'react-leaflet'

const LayerButton = ({ layer, setLayer }) => {
  const [isLayerVisible, setIsLayerVisible] = useState(false)

  const Layers = [
    { id: 1, image: '/img/layer1.png', TitleLayer: <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributor" /> },
    { id: 2, image: '/img/layer2.png', TitleLayer: <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="&copy; Carto" /> },
    { id: 3, image: '/img/layer3.png', TitleLayer: <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="&copy; Esri" /> },
    { id: 4, image: '/img/layer4.png', TitleLayer: <TileLayer url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png' attribution="&copy; OpenStreetMap contributor" /> }
  ]

  const handleLayerVisibility = (id) => {
    const selectedLayer = Layers.find(layer => layer.id === id)
    setIsLayerVisible(!isLayerVisible)

    if (selectedLayer) {
      setLayer(selectedLayer.TitleLayer)
    }
  }

  return (
    <div className="relative">
      <button
        className="bg-white rounded-full shadow-lg p-4 hover:bg-gray-200 transition"
        onClick={() => setIsLayerVisible(!isLayerVisible)}
      >
        <FiLayers size={24} />
      </button>

      {/* Menú desplegable hacia arriba */}
      {isLayerVisible && (
        <div className="absolute bottom-16 flex flex-col items-center space-y-2 z-10">
          {Layers.map(layer => (
            <button key={layer.id} className="relative rounded-full overflow-hidden shadow-lg border-2 border-black" onClick={() => handleLayerVisibility(layer.id)}>
              <img src={layer.image} alt={`Vista previa de ${layer.id}`} className="object-fit" />
            </button>
          ))}
        </div>

      )
      }
    </div >
  )
}

export default LayerButton
