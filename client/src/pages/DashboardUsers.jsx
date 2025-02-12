import AdminLayout from '../layout/AdminLayout'
import TableUsers from '../components/admin/TableUsers'
import { UsersProvider } from '../context/UsersContext'

const DashboardUsers = () => {
  return (
    <UsersProvider>
      <TableUsers />
    </UsersProvider>
  )
}

export default DashboardUsers
