import Header from '../components/admin/Header'
import TableUsers from '../components/admin/TableUsers'
import { UsersProvider } from '../context/UsersContext'

const Dashboard = () => {
  return (
    <div className='bg-backgraound-admin h-screen font-poppins'>
      <UsersProvider>
        < Header />
        <main>
          <TableUsers />
        </main>
      </UsersProvider>
    </div >
  )
}

export default Dashboard
