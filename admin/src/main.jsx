import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("no PUBLISHABLE_KEY found!");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode >,
)
