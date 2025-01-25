import { createBrowserRouter } from 'react-router'
import Auth from './pages/Auth'
import App from './App'
import ProtectedRoute from './components/ProtectedRoute' // Importa el componente de protección

const router = createBrowserRouter([
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    )
  },
  {
    path: '/',
    element: <Auth />
  }
])

export default router
