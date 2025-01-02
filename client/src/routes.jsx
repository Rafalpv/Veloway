import { createBrowserRouter } from 'react-router'
import Login from './pages/Login'
import Map from './pages/Map'
import SignUp from './pages/SignUp'

const router = createBrowserRouter([
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
