import { createBrowserRouter } from 'react-router'
import Auth from '@auth/pages/Auth'
import Dashboard from '@admin/pages/Dashboard'
import DashboardUsers from '@admin/pages/DashboardUsers'
import AdminLayout from '@admin/layout/AdminLayout'
import CreateRoute from '@user/pages/CreateRoute'
import UserRoute from '@userRoutes/pages/UserRoutes'
import ProtectedRoute from './ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '',
    element: <Auth />
  },
  {
    path: 'routes',
    children: [
      {
        index: true,
        element: <UserRoute />
      },
      {
        path: 'create',
        element: <CreateRoute />
      }
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout />, // Layout común para las rutas de admin
    children: [
      {
        index: true, // Se accede en `/admin`
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
