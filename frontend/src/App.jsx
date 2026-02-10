import './App.css'

import { Routes, Route, Navigate } from 'react-router'
import { useAuth } from '@clerk/clerk-react'

import LoginPage from "./pages/LoginPage"
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'

import PageLoader from './components/PageLoader'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return <PageLoader />

  return (
    <Routes>
      <Route path='/login' element={isSignedIn ? <Navigate to={'/home'} /> : <LoginPage />} />
      <Route path='/' element={isSignedIn ? <DashboardLayout /> : <Navigate to={'/login'} />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  )
}

export default App 
