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
        communityRoutesRes: action.payload.communityRoutesRes
      }
    case 'ADD_FAV_ROUTE':
      return {
        ...state,
        favRoutes: [...state.favRoutes, action.payload]
      }
    case 'DELETE_FAV_ROUTE':
      return {
        ...state,
        favRoutes: state.favRoutes.filter(route => route._id !== action.payload)
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
    communityRoutesRes: []
  }

  const [state, dispatch] = useReducer(routesReducer, initialState)
  const { authState } = useAuth()

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const [userRoutesRes, favRoutesRes, communityRoutesRes] = await Promise.all([
          axiosInstance.get(`/routes/user/${authState.user.id_user}`),
          axiosInstance.get(`/users/favRoutes/${authState.user.id_user}`),
          axiosInstance.get(`/routes/community/${authState.user.id_user}`)
        ])

        dispatch({
          type: 'SET_ALL_ROUTE_DATA',
          payload: {
            routes: userRoutesRes.data.routes,
            favRoutes: favRoutesRes.data.routes,
            communityRoutesRes: communityRoutesRes.data.routes
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
      console.error('Error eliminando ruta')
    }
  }

  const addFavRoute = async (routeId) => {
    try {
      const response = await axiosInstance.post('/users/favRoutes', {
        idUser: authState.user.id_user,
        idRoute: routeId
      })
      dispatch({
        type: 'ADD_FAV_ROUTE',
        payload: {
          ...state,
          favRoutes: [...state.favRoutes, response.data.route]
        }
      })
    } catch (error) {
      console.error('Error añadiendo ruta a favoritos')
      throw error
    }
  }

  const deleteFavRoute = async (routeId) => {
    try {
      await axiosInstance.delete('/users/favRoutes/remove', {
        data: {
          idUser: authState.user.id_user,
          idRoute: routeId
        }
      })
      dispatch({
        type: 'DELETE_FAV_ROUTE',
        payload: routeId
      })
    } catch (error) {
      console.error('Error eliminando ruta de favoritos', error)
    }
  }

  return (
    <RoutesContext.Provider value={{
      routes: state.routes,
      favRoutes: state.favRoutes,
      communityRoutesRes: state.communityRoutesRes,
      deleteRoute,
      addFavRoute,
      deleteFavRoute
    }}>
      {children}
    </RoutesContext.Provider>
  )
}

export default RoutesProvider
