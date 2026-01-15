import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function LoginPage() {
  return (
    <div className='h-screen hero'>
      <SignIn></SignIn>
    </div>
  )
}

export default LoginPage
