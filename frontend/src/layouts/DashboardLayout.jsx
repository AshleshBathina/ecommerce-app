import { Outlet } from "react-router";

import NavigationBar from "../components/NavigationBar";

const DashboardLayout = () => (
  <div className="min-h-screen bg-[#0F0F0F]">
    <NavigationBar />
    {/* On desktop push content right by sidebar width (w-56 = 14rem) */}
    <main className="md:ml-56">
      <Outlet />
    </main>
  </div>
)

export default DashboardLayout