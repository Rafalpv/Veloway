import React from 'react'
import { useAuth } from '../context/AuthContext'
import LogoutButton from '../components/LogoutButton'
import TableUsers from '../components/TableUsers'

const Dashboard = () => {
  const { authState } = useAuth()
  return (
    <div>
      <TableUsers />
      <LogoutButton />
    </div>
  )
}

export default Dashboard
