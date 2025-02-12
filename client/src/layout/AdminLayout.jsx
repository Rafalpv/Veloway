import { Outlet } from 'react-router'
import Header from '../components/admin/Header'

const AdminLayout = () => {
  return (
    <div className='bg-backgraound-admin font-poppins'>
      <Header />
      <main className='h-screen'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
