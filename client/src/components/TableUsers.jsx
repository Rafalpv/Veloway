import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'

const CellUser = ({ user }) => {
  return (
    <tr className="border-b border-black">
      <td className="p-4">
        <div className='flex items-center gap-10'>
          <span className='text-2xl'>👤</span>
          <div>
            <strong className='text-xl'>{user.nickname}</strong>
            <br />
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-lg">{user.level}</td>
      <td className="p-4">{user.createdAt}</td>

      <td className="p-4 text-center">
        <button className="text-2xl hover:bg-gray-200 rounded-full p-2 transition">⋮</button>
      </td>
    </tr>
  )
}

const ListUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosInstance.get('/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    getUsers()
  }, [])

  return (
    <tbody>
      {users.map((user) => (
        <CellUser key={user.id_user} user={user} />
      ))}
    </tbody>
  )
}

const TableUsers = () => {
  return (
    <div className='overflow-x-auto px-20'>
      <table className='w-full bg-transparent'>
        <thead className='text-2xl border-b border-black'>
          <tr>
            <th className='text-left ml-14 p-4'>Nombre de Usuario</th>
            <th className='text-left p-4'>Nivel <button>⬇</button></th>
            <th className='text-left p-4'>Fecha inicio</th>
            <th className='p-4'></th>
          </tr>
        </thead>
        <ListUsers />
      </table>
      {/* Paginación de ejemplo */}
    </div>
  )
}

export default TableUsers
