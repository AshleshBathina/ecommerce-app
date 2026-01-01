import { useQuery } from "@tanstack/react-query"
import { ordersApi, StatsApi } from "../lib/api"

import { IndianRupee, PackageIcon, ShoppingBagIcon } from "lucide-react"

function DashboardPage() {
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.getAll,
  })

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: StatsApi.getDashboard
  })

  const recentOrders = ordersData.slice(0, 5) || []

  const statsCards = [
    { name: "Total Revenue", value: statsLoading ? "..." : `₹${statsData?.data.totalRevenue.toFixed(2) || 0}`, icon: <IndianRupee className="size-8" /> },
    { name: "Total Orders", value: statsLoading ? "..." : statsData?.data.totalOrders || 0, icon: <ShoppingBagIcon className="size-8" /> },
    {
      name: "Total Customers",
      value: isLoading ? "..." : statsData?.totalCustomers || 0,
      icon: <UsersIcon className="size-8" />
    },
    {
      name: "Total Products",
      value: isLoading ? "..." : statsData?.totalProducts || 0,
      icon: <PackageIcon className="size-8" />
    },
  ]

  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage