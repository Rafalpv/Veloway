import { Outlet } from 'react-router'
import Header from '@admin/components/Header'
import { UsersProvider } from '@admin/context/UsersContext'

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
