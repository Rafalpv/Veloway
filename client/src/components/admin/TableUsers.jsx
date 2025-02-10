import { useContext } from 'react'
import { UsersContext } from '../../context/UsersContext'
import FilterButton from './FilterButton'
import FilterButtonLevel from './FilterButtonLevel'
import AddUsersButton from './AddUsersButton'
import ResetButton from './ResetButton'

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
      <td className="p-4 text-center">{user.createdAt}</td>
      <td></td>
      <td></td>
      <td className="p-4 text-center">
        <button className="text-2xl hover:bg-gray-200 rounded-full p-2 transition">⋮</button>
      </td>
    </tr>
  )
}

const ListUsers = () => {
  const { filteredUsers } = useContext(UsersContext)

  return (
    <tbody>
      {filteredUsers.map((user) => (
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
            <th className='text-left p-4 w-1/4'>Nombre de Usuario</th>
            <th className='text-left p-4 w-1/12'>Nivel <FilterButtonLevel /></th>
            <th className='text-cente p-4 w-1/3'>Fecha inicio</th>
            <th className='py-4 w-1/5'><FilterButton /></th>
            <th className=''><ResetButton /></th>
            <th className='w-20'><AddUsersButton /></th>
          </tr>
        </thead>
        <ListUsers />
      </table>
    </div>
  )
}

export default TableUsers
