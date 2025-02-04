import { createContext, useContext, useEffect, useReducer } from 'react'
import axiosInstance from '../api/axiosInstance'

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, filteredUsers: action.payload }

    case 'FILTER_USERS':
      return {
        ...state,
        filteredUsers: state.users.filter(user =>
          user.nickname.toLowerCase().includes(action.payload.toLowerCase())
        )
      }

    case 'SORT_USERS':
      return {
        ...state,
        filteredUsers: [...state.filteredUsers].sort((a, b) =>
          action.payload === 'asc'
            ? a.level - b.level
            : b.level - a.level
        )
      }

    case 'RESET_FILTERS':
      return { ...state, filteredUsers: state.users }

    default:
      return state
  }
}

// Creación del contexto
export const UsersContext = createContext()

// Proveedor del contexto
export const UsersProvider = ({ children }) => {
  const initialState = {
    users: [],
    filteredUsers: []
  }
  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users')
        dispatch({ type: 'SET_USERS', payload: response.data })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message })
      }
    }

    fetchUsers()
  }, [])

  const filterUsers = (searchTerm) => {
    dispatch({ type: 'FILTER_USERS', payload: searchTerm })
  }

  const sortUsers = (order) => {
    dispatch({ type: 'SORT_USERS', payload: order }) // 'asc' o 'desc'
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  return (
    <UsersContext.Provider value={{
      users: state.users,
      filteredUsers: state.filteredUsers,
      filterUsers,
      sortUsers,
      resetFilters
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
