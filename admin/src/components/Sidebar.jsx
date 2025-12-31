import { useUser } from "@clerk/clerk-react"
import { ShoppingBagIcon } from "lucide-react"
import { Link, useLocation } from "react-router"
import { NAVIGATION } from "./Navbar"


function Sidebar() {
  const location = useLocation();
  const { user } = useUser()

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

      <div className="p-4 w-full">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <ShoppingBagIcon className="size-6 text-primary-content" />
          </div>
          <span className="text-xl font-bold is-drawer-close:hidden">Admin</span>
        </div>
      </div>

      <ul className="menu w-full grow flex flex-col gap-2">
        {NAVIGATION.map(item => {
          const isActive = location.pathname === item.path
          return (
            <li
              key={item.path}
            >
              <Link to={item.path} className={`is-drawer-close:tooltip is-drawer-close:tooltip-right
                ${isActive ? "bg-primary text-primary-content" : ""}
                `}
              >
                {item.icon}
                <span className="is-drawer-close:hidden">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar