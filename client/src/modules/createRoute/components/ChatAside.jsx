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
        handleRouteByChat(coordinates)
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
    <div className={`relative flex flex-col ${chatVisible ? 'w-1/4' : 'hidden'} bg-background-light dark:bg-background-dark border-l-2 border-theme-light dark:border-theme-dark h-auto`}>

      <div className='flex items-center justify-between p-4 border-b border-theme-light dark:border-theme-dark bg-surface-light dark:bg-surface-dark'>
        <h2 className='text-lg font-semibold text-text-light dark:text-text-dark'>Asistente ciclista</h2>
        <button
          onClick={() => setMessages([])}
          className='text-sm text-secondary-light dark:text-secondary-dark hover:text-danger-light dark:hover:text-danger-dark transition'
          title='Limpiar chat'
        >
          Limpiar
        </button>
      </div>

      <div className='flex-1 overflow-y-auto p-6 space-y-4 text-sm'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`px-4 py-3 rounded-xl shadow-sm overflow-x-auto 
              ${msg.role === 'user'
                ? 'bg-secondary-light text-white dark:bg-secondary-dark'
                : msg.role === 'assistant'
                  ? 'bg-theme-light dark:bg-theme-dark text-text-light dark:text-text-dark border border-theme-light dark:border-theme-dark'
                  : 'bg-danger-light dark:bg-danger-dark text-text-light dark:text-text-dark border border-danger-light dark:border-danger-dark'
              }`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className='px-4 py-3 rounded-xl text-center text-text-light dark:text-text-dark'>
            <span>🌐 Cargando...</span>
          </div>
        )}
      </div>

      <div className='p-4 border-t border-theme-light dark:border-theme-dark bg-surface-light dark:bg-surface-dark'>
        <div className='flex items-center gap-2'>
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Escribe tu mensaje...'
            className='flex-1 p-3 border border-theme-light dark:border-theme-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark'
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className='bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded-xl hover:bg-secondary-light dark:hover:bg-secondary-dark transition'
          >
            Enviar
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatAside
