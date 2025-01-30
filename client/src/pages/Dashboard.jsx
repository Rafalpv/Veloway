import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'

const Dashboard = () => {
  return (
    <main className='bg-backgraound-admin h-screen'>
      <Header />
    </main>
  )
}

export default Dashboard
