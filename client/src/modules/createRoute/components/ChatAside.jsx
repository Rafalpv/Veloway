import { useState } from 'react'
import { useMarkersContext } from '../pages/CreateRoute'
import axiosInstance from '@api/axiosInstance'

const ChatAside = () => {
  const { chatVisible } = useMarkersContext()

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (input.trim() === '') return

    const newMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, newMessage])
    setInput('')

    try {
      const response = await axiosInstance.post('/routes/chat', {
        message: input
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply // Asegúrate de que el backend responda con { reply: "..." }
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error al obtener respuesta del asistente:', error)
      // Puedes mostrar un mensaje de error al usuario si quieres
    }
  }

  return (
    <div className={`relative flex flex-col ${chatVisible ? 'w-1/4' : 'hidden'} bg-[#f7f7f8] border-l-2 border-black h-auto`}>

      <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
        <h2 className='text-lg font-semibold text-gray-700'>Asistente cilcista</h2>
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
              : 'bg-slate-400 self-start text-left border border-gray-200'
              }`}
          >
            {msg.content}
          </div>
        ))}
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
