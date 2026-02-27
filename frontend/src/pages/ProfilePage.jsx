import { useUser, useClerk } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import { ordersApi, userApi } from "../lib/api"
import {
  User,
  ListOrdered,
  MapPin,
  Heart,
  Bell,
  ShieldCheck,
  LogOut,
  ChevronRight,
  CheckCircle2,
} from "lucide-react"
import { useNavigate } from "react-router"

/* ─── tiny helpers ─────────────────────────────────────────── */

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

/* ─── sub-components ────────────────────────────────────────── */

const ActionTile = ({ icon, label, accent, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#1C1C1E] p-5 transition-colors hover:bg-[#2C2C2E] active:scale-95 w-full aspect-square"
  >
    <div
      className="flex items-center justify-center rounded-2xl p-3"
      style={{ backgroundColor: accent + "22" }}
    >
      {icon}
    </div>
    <span className="text-sm font-medium text-white">{label}</span>
  </button>
)

const SettingsRow = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-between w-full px-4 py-4 transition-colors hover:bg-[#2C2C2E] active:bg-[#2C2C2E] rounded-2xl"
  >
    <div className="flex items-center gap-3">
      <div className="text-white/70">{icon}</div>
      <span className="text-white text-sm font-medium">{label}</span>
    </div>
    <ChevronRight className="text-white/40 size-4" />
  </button>
)

/* ─── main component ─────────────────────────────────────────── */

const ProfilePage = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getUserOrders,
  })

  const { data: addresses = [] } = useQuery({
    queryKey: ["addresses"],
    queryFn: userApi.getAddresses,
  })

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: userApi.getWishlist,
  })

  const fullName = user?.fullName || "User"
  const email = user?.primaryEmailAddress?.emailAddress || ""
  const initials = getInitials(fullName)
  const avatarUrl = user?.imageUrl

  const handleSignOut = () => signOut(() => navigate("/login"))

  const actionTiles = [
    {
      icon: <User className="size-6" style={{ color: "#6C8EEF" }} />,
      label: "Edit Profile",
      accent: "#6C8EEF",
      onClick: () => { },
    },
    {
      icon: <ListOrdered className="size-6" style={{ color: "#34C759" }} />,
      label: `Orders${orders.length ? ` (${orders.length})` : ""}`,
      accent: "#34C759",
      onClick: () => { },
    },
    {
      icon: <MapPin className="size-6" style={{ color: "#FF9F0A" }} />,
      label: `Addresses${addresses.length ? ` (${addresses.length})` : ""}`,
      accent: "#FF9F0A",
      onClick: () => navigate("/addresses"),
    },
    {
      icon: <Heart className="size-6" style={{ color: "#FF375F" }} />,
      label: `Wishlist${wishlist.length ? ` (${wishlist.length})` : ""}`,
      accent: "#FF375F",
      onClick: () => { },
    },
  ]

  const settingsRows = [
    { icon: <Bell className="size-5" />, label: "Notifications", onClick: () => { } },
    { icon: <ShieldCheck className="size-5" />, label: "Privacy & Security", onClick: () => { } },
  ]

  return (
    <div className="min-h-screen bg-[#0F0F0F] pb-28 md:pb-10 pt-7">
      {/* ── desktop: centered narrow card ── */}
      <div className="max-w-lg mx-auto px-4 space-y-4">

        {/* Profile card */}
        <div className="bg-[#1C1C1E] rounded-3xl p-5 flex items-center gap-4">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="size-16 rounded-full object-cover"
              />
            ) : (
              <div className="size-16 rounded-full bg-[#2C5282] flex items-center justify-center">
                <span className="text-white font-bold text-xl">{initials}</span>
              </div>
            )}
            {/* verified badge */}
            <span className="absolute bottom-0 right-0 bg-green-500 rounded-full p-0.5">
              <CheckCircle2 className="size-3.5 text-white fill-green-500" />
            </span>
          </div>

          {/* Name / email */}
          <div className="flex flex-col min-w-0">
            <h1 className="text-white font-semibold text-lg leading-tight truncate">{fullName}</h1>
            <p className="text-white/50 text-sm truncate">{email}</p>
          </div>
        </div>

        {/* 2×2 Action grid */}
        <div className="grid grid-cols-2 gap-3">
          {actionTiles.map((tile) => (
            <ActionTile key={tile.label} {...tile} />
          ))}
        </div>

        {/* Settings rows */}
        <div className="bg-[#1C1C1E] rounded-3xl divide-y divide-white/5 px-1">
          {settingsRows.map((row) => (
            <SettingsRow key={row.label} {...row} />
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 bg-[#1C1C1E] border border-red-800/40 text-red-500 font-semibold py-4 rounded-2xl hover:bg-red-900/20 transition-colors active:scale-95"
        >
          <LogOut className="size-5" />
          Sign Out
        </button>

      </div>
    </div>
  )
}

export default ProfilePage