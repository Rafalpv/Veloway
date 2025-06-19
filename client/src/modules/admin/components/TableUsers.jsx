import { useContext, useState } from 'react'
import { UsersContext } from '../context/UsersContext'
import FilterButton from './FilterButton'
import FilterButtonLevel from './FilterButtonLevel'
import AddUsersButton from './AddUsersButton'
import ResetButton from './ResetButton'
import DeleteUser from './DeleteUser'
import EditUser from './EditUserButton'

const CellUser = ({ user }) => {
  return (
    <tr className='border-b border-black'>
      <td className='p-3'>
        <div className='flex items-center gap-10'>
          <span className='text-2xl'>👤</span>
          <div>
            <strong className='text-xl'>{user.nickname}</strong>
            <br />
            <span className='text-sm text-gray-500'>{user.email}</span>
          </div>
        </div>
      </td>
      <td className='p-4 text-lg'>{user.level}</td>
      <td className='p-4 text-center'>{user.createdAt}</td>
      <td />
      <td className='p-4 text-center'>
        <EditUser nickname={user.nickname} />
      </td>
      <td className='p-4 text-center'>
        <DeleteUser nickname={user.nickname} />
      </td>
    </tr>
  )
}

const ListUsers = ({ filteredUsers }) => {
  return (
    <tbody>
      {filteredUsers.map((user) => (
        <CellUser key={user.id_user} user={user} />
      ))}
    </tbody>
  )
}

const TableUsers = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { filteredUsers } = useContext(UsersContext)

  return (
    <div className='relative px-20'>
      <table className='w-full'>
        <thead className='text-2xl border-b-2 bg-backgraound-admin border-black sticky top-0'>
          <tr>
            <th className='text-left p-4 w-1/4'>Nombre de Usuario &nbsp; <span className='text-blue'>{filteredUsers.length}</span></th>
            <th className='text-left p-4 w-1/12'>Nivel <FilterButtonLevel showMenu={showMenu} setShowMenu={setShowMenu} /></th>
            <th className='text-cente p-4 w-1/3'>Fecha inicio</th>
            <th className='py-4 w-1/5'><FilterButton /></th>
            <th><ResetButton setShowMenu={setShowMenu} /></th>
            <th className='w-20'><AddUsersButton /></th>
          </tr>
        </thead>
        <ListUsers filteredUsers={filteredUsers} />
      </table>
    </div>
  )
}

export default TableUsers
