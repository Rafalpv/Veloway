import { Outlet } from 'react-router'
import { RoutesProvider } from '../context/RoutesContext'
import Header from '../components/Header'

const UserLayout = () => {
  return (
    <div className='min-h-screen p-5 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors font-poppins'>
      <Header />
      <RoutesProvider>
        <Outlet />
      </RoutesProvider>
    </div>
  )
}

export default UserLayout
