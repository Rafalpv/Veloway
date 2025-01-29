import React from 'react'
import { useAuth } from '../context/AuthContext'
import LogoutButton from '../components/LogoutButton'

const Dashboard = () => {
  const { authState } = useAuth()
  return (
    <div>
      <p>Welcome, {authState.user}! </p>
      <LogoutButton />
    </div>
  )
}

export default Dashboard
