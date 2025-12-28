import React from 'react'
import { Outlet } from 'react-router'

function DashboardLayout() {
  return (
    <div>
      <h1>sidevar</h1>
      <h1>navbar</h1>
      <Outlet />
    </div>
  )
}

export default DashboardLayout