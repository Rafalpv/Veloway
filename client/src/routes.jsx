import { createBrowserRouter } from 'react-router'
import Map from './pages/Map'
import Auth from './pages/Auth'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '/map',
    element: <Map />
  }
])

export default router
