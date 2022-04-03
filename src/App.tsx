import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Users } from './pages/Users'
import { Home } from './pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </div>
  )
}

export default App
