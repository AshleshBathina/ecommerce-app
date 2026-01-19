import React from "react";
import { ShoppingBag, Plus } from "lucide-react";

const Sidebar = () => {


  return (
    <div className="flex items-center justify-between bg-white h-14 w-screen px-4 md:h-16 md:px-20">

      <span className="w-7 h-7 flex justify-center items-center">
        <h3 className="font-['Pacifico'] text-xl md:text-2xl font-bold">A</h3>
      </span>
      <div className="flex items-center gap-2">
        <button className="flex cursor-pointer justify-center items-center rounded-3xl hover:bg-gray-200 h-10 w-10">
          <ShoppingBag className="size-5 text-gray-900 md:size-6" />
        </button>
        <button className="flex items-center bg-black text-md text-white px-3.5 py-1.5 font-medium hover:bg-gray-800 tracking-wide cursor-pointer rounded-md font-[Inter]"><Plus className="size-4 mr-1" /><p className="text-sm"> Create scenario</p></button>
      </div>
    </div>
  )
}

export default Sidebar