import { LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

const NavigationBar = () => {
  const location = useLocation().pathname
  const navigate = useNavigate()

  const navigateEnum = [
    { id: 'HOME', name: 'Home', path: '/home', icon: <LayoutGrid className={`size-7 ${location === '/home' ? 'fill-green-400' : 'fill-white'}`} /> },
    { id: 'CART', name: 'Cart', path: '/cart', icon: <ShoppingCart className={`size-7 ${location === '/cart' ? 'fill-green-400' : 'fill-white'}`} /> },
    { id: 'PROFILE', name: 'Profile', path: '/profile', icon: <User className={`size-7 ${location === '/profile' ? 'fill-green-400' : 'fill-white'}`} /> },
  ]

  return (
    <>
      {/* ── Mobile: floating pill nav (unchanged) ── */}
      <ul className="md:hidden gap-6 flex items-center bg-black/50 backdrop-blur-sm rounded-3xl z-10 fixed bottom-4 left-1/2 -translate-x-1/2 p-4">
        {navigateEnum.map(nav => (
          <li key={nav.id}>
            <button onClick={() => navigate(nav.path)} className={`flex flex-col items-center ${location === nav.path ? 'text-green-400' : 'text-white'}`}>
              {nav.icon}
              <p className="font-medium text-xs">{nav.name}</p>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Desktop: vertical sidebar ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-[#111111] border-r border-[#222222] z-20 pt-8 pb-6 px-5 gap-2">
        {/* Brand */}
        <div className="mb-8 px-2">
          <h1 className="text-green-400 font-extrabold text-2xl tracking-tight">Ashop</h1>
          <p className="text-[#555] text-xs mt-0.5">Your comfortable store</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navigateEnum.map(nav => {
            const active = location === nav.path
            return (
              <button
                key={nav.id}
                onClick={() => navigate(nav.path)}
                className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                  ${active
                    ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                    : 'text-[#9CA3AF] hover:bg-[#1A1A1A] hover:text-white'
                  }`}
              >
                {nav.icon}
                <span>{nav.name}</span>
                {active && <span className="ml-auto w-1.5 h-5 bg-green-400 rounded-full" />}
              </button>
            )
          })}
        </nav>

        {/* Footer hint */}
        <p className="text-[#444] text-[10px] px-2 mt-auto">© 2025 ShopX</p>
      </aside>
    </>
  )
}

export default NavigationBar