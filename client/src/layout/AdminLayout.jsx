import { Outlet } from 'react-router'
import Header from '../components/admin/Header'
import { UsersProvider } from '../context/UsersContext'

const AdminLayout = () => {
  return (
    <div className='flex flex-col h-screen bg-backgraound-admin font-poppins'>
      <Header />
      <main className='flex-1 overflow-auto'>
        <UsersProvider>
          <Outlet />
          </UsersProvider>
      </main>
    </div>
  )
}

export default AdminLayout
