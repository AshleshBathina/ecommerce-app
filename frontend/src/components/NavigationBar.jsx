import { useState } from "react"
import { LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const NavigationBar = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  const navigateEnum = [
    { id: 'HOME', name: 'Home', path: '/home', icon: <LayoutGrid className={`${location === '/home' ? 'fill-green-400' : 'fill-white'}`} /> },
    { id: 'CART', name: 'Cart', path: '/cart', icon: <ShoppingCart className={`${location === '/cart' ? 'fill-green-400' : 'fill-white'}`} /> },
    { id: 'PROFILE', name: 'Profile', path: 'profile', icon: <User className={`${location === '/profile' ? 'fill-green-400' : 'fill-white'}`} /> },
  ]

  return (
    <ul className="gap-6 flex items-center bg-black/50 backdrop-blur-sm rounded-3xl z-10 fixed bottom-4 left-1/2 -translate-x-1/2 p-4">
      {navigateEnum.map(nav => (
        <li key={nav.id}>
          <button onClick={() => navigate(nav.path)} className={`flex flex-col items-center ${location === nav.path ? 'text-green-400' : 'text-white'}`}>
            {nav.icon}
            <p className="font-medium text-xs">{nav.name}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default NavigationBar