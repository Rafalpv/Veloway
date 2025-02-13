import { Outlet } from 'react-router'
import Header from '../components/admin/Header'
import { UsersProvider } from '../context/UsersContext'

const AdminLayout = () => {
  return (
    <div className='bg-backgraound-admin font-poppins'>
      <Header />
      <main className='h-screen'>
        <UsersProvider>
          <Outlet />
          </UsersProvider>
      </main>
    </div>
  )
}

export default AdminLayout
