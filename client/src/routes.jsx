import { createBrowserRouter } from 'react-router'
import Auth from './pages/Auth'
import CreateRoute from './pages/CreateRoute'
import Dashboard from './pages/Dashboard'
import DashboardUsers from './pages/DashboardUsers'
import AdminLayout from './layout/AdminLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  },
  {
    path: '/user',
    element: <CreateRoute />
  },
  {
    path: '/admin',
    element: <AdminLayout />, // Layout común para las rutas de admin
    children: [
      {
        index: true, // Se carga cuando entras a `/admin`
        element: <Dashboard />
      },
      {
        path: 'users', // Se accede en `/admin/users`
        element: <DashboardUsers />
      }
    ]
  }
])

export default router
