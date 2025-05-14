import { useState } from 'react'
import { useMarkersContext } from '../pages/CreateRoute'
import axiosInstance from '@api/axiosInstance'
import { useMapMarkers } from '../context/MapMarkersContext'

const ChatAside = () => {
  const { chatVisible } = useMarkersContext()
  const { handleRouteByChat } = useMapMarkers()

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Estado de carga

  const handleSend = async () => {
    if (input.trim() === '') return

    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await axiosInstance.post('/routes/chat', {
        message: input
      })

      const replyText = response?.data?.reply
      const coordinates = response?.data?.locations

      if (replyText) {
        const assistantMessage = { role: 'assistant', content: replyText }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        console.error('No se recibió respuesta válida del asistente.')
      }

      if (coordinates && Array.isArray(coordinates) && coordinates.length > 0) {
        handleRouteByChat(coordinates) // ✅ Tu función para insertar los marcadores
      }
    } catch (error) {
      console.error('Error al obtener respuesta del asistente:', error)
      const errorMessage = {
        role: 'assistant error',
        content: 'Hubo un error al procesar tu solicitud. Intenta nuevamente.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setInput('')
      setIsLoading(false)
    }
  }

  return (
    <div className={`relative flex flex-col ${chatVisible ? 'w-1/4' : 'hidden'} bg-[#f7f7f8] border-l-2 border-black h-auto`}>

      <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
        <h2 className='text-lg font-semibold text-gray-700'>Asistente ciclista</h2>
        <button
          onClick={() => setMessages([])}
          className="text-sm text-gray-500 hover:text-red-600 transition"
          title="Limpiar chat"
        >
          Limpiar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-3 rounded-xl shadow-sm overflow-x-auto ${msg.role === 'user'
              ? 'bg-[#d1e8ff]'
              : msg.role === 'assistant'
                ? 'bg-slate-400 self-start text-left border border-gray-200'
                : 'bg-red-100 self-start text-left border border-red-500'
              }`}
          >
            {msg.content}
          </div>
        ))}

        {/* Indicador de carga cuando isLoading es verdadero */}
        {isLoading && (
          <div className="px-4 py-3 rounded-xl text-center text-gray-600">
            <span>🌐 Cargando...</span>
            {/* Aquí podrías poner un spinner en lugar del texto si prefieres */}
          </div>
        )}
      </div>

      <div className='p-4 border-t border-gray-200 bg-white'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Escribe tu mensaje...'
            className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition"
          >
            Enviar
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatAside
