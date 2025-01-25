import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { authState } = useAuth()
  console.log(authState)
  return (
    <div>
      {authState.auth
        ? (
          <p>Welcome, {authState.user}!</p>)
        : (
          <p>Please log in.</p>)
      }
    </div>
  )
}

export default Profile
