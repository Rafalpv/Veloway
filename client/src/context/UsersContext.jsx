import { createContext, useEffect, useReducer } from 'react'
import axiosInstance from '../api/axiosInstance'

// Reducer
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload
      }

    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      }

    case 'SET_SELECTED_LEVELS':
      return {
        ...state,
        selectedLevels: action.payload
      }

    case 'APPLY_FILTERS': {
      const { users, searchTerm, selectedLevels } = state

      const filtered = users.reduce((acc, user) => {
        const matchesSearch = searchTerm
          ? user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
          : true

        const matchesLevel = selectedLevels.length > 0
          ? selectedLevels.includes(user.level)
          : true

        if (matchesSearch && matchesLevel) acc.push(user)
        return acc
      }, [])

      return { ...state, filteredUsers: filtered }
    }

    case 'SORT_USERS':
      return {
        ...state,
        filteredUsers: [...state.filteredUsers].sort((a, b) =>
          action.payload === 'asc' ? a.level - b.level : b.level - a.level
        )
      }

    case 'RESET_FILTERS':
      return {
        ...state,
        searchTerm: '',
        selectedLevels: [],
        filteredUsers: state.users
      }

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
    filteredUsers: [],
    searchTerm: '',
    selectedLevels: []
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users')
        dispatch({ type: 'SET_USERS', payload: response.data })
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  // Acciones
  const filterUsers = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const filterByLevel = (selectedLevels) => {
    dispatch({ type: 'SET_SELECTED_LEVELS', payload: selectedLevels })
    dispatch({ type: 'APPLY_FILTERS' })
  }

  const sortUsers = (order) => {
    dispatch({ type: 'SORT_USERS', payload: order })
  }

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' })
  }

  return (
    <UsersContext.Provider value={{
      users: state.users,
      filteredUsers: state.filteredUsers,
      searchTerm: state.searchTerm,
      selectedLevels: state.selectedLevels,
      filterUsers,
      filterByLevel,
      sortUsers,
      resetFilters
    }}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
