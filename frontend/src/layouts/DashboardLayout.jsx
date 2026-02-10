import { Outlet } from "react-router";

import NavigationBar from "../components/NavigationBar";

const DashboardLayout = () => (
  <div className="min-h-screen">
    <NavigationBar />
    <Outlet />
  </div>
)

export default DashboardLayout