import axiosInstance from '../api/axiosInstance'
import { useState, useEffect } from 'react'

const CellUser = ({ user }) => {
  return (
    <tr>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>👤</span>
          <div>
            <strong>{user.nickname}</strong>
            <br />
            <span style={{ fontSize: 'small', color: 'gray' }}>
              {user.email}
            </span>
          </div>
        </div>
      </td>
      <td>{user.level}</td>
      <td>
        <button>⋮</button>
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
    <div style={{ overflowX: 'auto', padding: '20px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: '#f0f3f7'
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px' }}>Nombre de Usuario</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Nivel ⬇</th>
            <th></th>
          </tr>
        </thead>
        <ListUsers />
      </table>
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <span>1 2 3 4 5 6 ... 19</span> {/* Paginación de ejemplo */}
      </div>
    </div>
  )
}

export default TableUsers
