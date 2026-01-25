import { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router'

import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/clerk-react'

import Sidebar from "./components/Sidebar"
import LoginPage from "./pages/LoginPage"
import SsoPage from './pages/SsoPage'
import HomePage from './pages/HomePage'

function App() {


  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sso" element={<SsoPage />} />
      <Route path="/sb" element={<Sidebar />} />
    </Routes>
  )
}

export default App
