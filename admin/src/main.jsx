import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';

import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("no PUBLISHABLE_KEY found!");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={"pk_test_ZG9taW5hbnQtamF5YmlyZC02Ni5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
