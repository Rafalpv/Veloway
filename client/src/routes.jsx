import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Map from './pages/Map'
import SignUp from './pages/SignUp'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/map',
    element: <Map />
  }
])

export default router
