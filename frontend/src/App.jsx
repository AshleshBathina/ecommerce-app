import { useState } from 'react'
import './App.css'
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/clerk-react'

function App() {


  return (
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default App
