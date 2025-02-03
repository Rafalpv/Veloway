import { createBrowserRouter } from 'react-router'
import Auth from './pages/Auth'
import App from './App'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute' // Importa el componente de protección

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
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
