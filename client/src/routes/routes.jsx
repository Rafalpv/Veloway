import { createBrowserRouter, Outlet } from 'react-router'
import Auth from '@auth/pages/Auth'
import Dashboard from '@admin/pages/Dashboard'
import DashboardUsers from '@admin/pages/DashboardUsers'
import AdminLayout from '@admin/layout/AdminLayout'
import CreateRoute from '@user/pages/CreateRoute'
import UserRoute from '@userRoutes/pages/UserRoutes'
import ProtectedRoute from './ProtectedRoute'
import RouteDetails from '../modules/user/pages/RouteDetails'

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Outlet />
  </ProtectedRoute>
)

const router = createBrowserRouter([
  {
    path: '',
    element: <Auth />
  },
  {
    element: '', // Ahora ProtectedLayout envuelve a todo
    children: [
      {
        path: '/:nickname',
        children: [
          {
            index: true,
            element: <UserRoute />
          },
          {
            path: 'create',
            element: <CreateRoute />
          },
          {
            path: ':id',
            element: <RouteDetails />
          }
        ]
      },
      {
        path: 'admin',
        element: <AdminLayout />, // Admin también dentro de la ruta protegida
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: 'users',
            element: <DashboardUsers />
          }
        ]
      }
    ]
  }
])

export default router
