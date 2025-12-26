import { Routes, Route } from "react-router"

import LoginPage from "./pages/LoginPage"
import { useAuth } from "@clerk/clerk-react"

function App() {

  const { isSignedIn } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />} />
    </Routes>
  )
}

export default App
