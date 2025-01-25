import { createBrowserRouter } from 'react-router'
import Auth from './pages/Auth'
import App from './App'
import Profile from './pages/Profile'
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
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  }
])

export default router
