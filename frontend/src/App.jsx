import { useState } from 'react'
import './App.css'
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/clerk-react'

import Sidebar from "./components/Sidebar"

function App() {


  return (
    <div className='h-screen bg-blue-500'>
      <Sidebar />
    </div>
  )
}

export default App
