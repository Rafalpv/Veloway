import { createBrowserRouter } from 'react-router'
import Auth from './pages/Auth'
import CreateRoute from './pages/CreateRoute'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute' // Importa el componente de protección

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  },
  {
    path: '/map',
    element: (
      <CreateRoute />
    )
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
])

export default router
