import React from 'react'
import Login from './pages/Login'
import Map from './pages/Map'
import { Routes, Route } from 'react-router'

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/map' element={<Map />} />
    </Routes>
  )
}
