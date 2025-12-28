import React from 'react'

import { LoaderIcon } from "lucide-react"

function PageLoader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoaderIcon className="size-12 animate-spin" />
    </div>
  )
}

export default PageLoader