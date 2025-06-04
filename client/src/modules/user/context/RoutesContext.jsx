import { createContext, useEffect, useReducer } from 'react'
import axiosInstance from '@api/axiosInstance'
import { useAuth } from '@auth/context/AuthContext'

export const routesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL_ROUTE_DATA':
      return {
        ...state,
        routes: action.payload.routes,
        favRoutes: action.payload.favRoutes,
        allRoutes: action.payload.allRoutes
      }

    case 'DELETE_ROUTE':
      return {
        ...state,
        routes: state.routes.filter(route => route._id !== action.payload)
      }
  }
}

export const RoutesContext = createContext()

export const RoutesProvider = ({ children }) => {
  const initialState = {
    routes: [],
    favRoutes: [],
    allRoutes: []
  }

  const [state, dispatch] = useReducer(routesReducer, initialState)
  const { authState } = useAuth()

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const [userRoutesRes, favRoutesRes, allRoutesRes] = await Promise.all([
          axiosInstance.get(`/routes/user/${authState.user.id_user}`),
          axiosInstance.get(`/users/favRoutes/${authState.user.id_user}`),
          axiosInstance.get('/routes')
        ])

        dispatch({
          type: 'SET_ALL_ROUTE_DATA',
          payload: {
            routes: userRoutesRes.data.routes,
            favRoutes: favRoutesRes.data.routes,
            allRoutes: allRoutesRes.data.routes
          }
        })
      } catch (error) {
        console.error('Error fetching user routes', error)
      }
    }

    fetchRoutes()
  }, [])

  const deleteRoute = async (id) => {
    try {
      await axiosInstance.delete(`/routes/${id}`)
      dispatch({ type: 'DELETE_ROUTE', payload: id })
    } catch (error) {
      console.error('Error deleting route', error)
    }
  }

  return (
    <RoutesContext.Provider value={{
      routes: state.routes,
      favRoutes: state.favRoutes,
      allRoutes: state.allRoutes,
      deleteRoute
    }}>
      {children}
    </RoutesContext.Provider>
  )
}

export default RoutesProvider
