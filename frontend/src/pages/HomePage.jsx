import { productsApi } from "../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Settings2, Search, LayoutGrid, Handbag, Trophy, LibraryBig, MonitorSmartphone, Star } from "lucide-react"

import PageLoader from "../components/PageLoader"

const categories = [
  {
    id: 'ALL',
    title: 'All',
    icon: <LayoutGrid className="size-9" />
  },
  {
    id: 'ELECTRONICS',
    title: 'Electronics',
    icon: <MonitorSmartphone className="size-9" />
  },
  {
    id: 'FASHION',
    title: 'Fashion',
    icon: <Handbag className="size-9" />
  },
  {
    id: 'SPORTS',
    title: 'Sports',
    icon: <Trophy className="size-9" />
  },
  {
    id: 'BOOKS',
    title: 'Books',
    icon: <LibraryBig className="size-9" />
  }

]

const HomePage = () => {

  const { data: productsData, isPending, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: productsApi.getAllProducts
  })

  return (
    <div className="flex flex-col min-h-screen h-full bg-[#0F0F0F] pt-7">
      <div className="flex justify-between px-7">
        <div className="">
          <h1 className="font-bold text-white text-2xl">BathinaGoods</h1>
          <p className="text-[#9CA3AF] text-xs">Shop whatever you want!</p>
        </div>
        <button className="bg-[#1A1A1A] p-4 rounded-4xl">
          <Settings2 className="size-5 text-white" />
        </button>
      </div>
      <div className="px-7 mt-5">
        <div className="flex items-center bg-[#222222] gap-3 rounded-2xl px-4">
          <Search className="text-[#8A8A8A] text-sm" />
          <input className="py-4 w-full outline-none text-white placeholder:text-[#8A8A8A]" placeholder="Search for products..." type="search" />
        </div>
      </div>

      <ul className="flex items-center px-7 mt-5 overflow-x-auto no-scrollbar gap-4 scroll-smooth">
        {categories.map((category) => (
          <li key={category.id} className="p-4 first-child bg-[#222222] text-gray-300 first:bg-green-500 first:text-slate-900 rounded-2xl">
            <button className="flex justify-center items-center">
              {category.icon}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-between px-7">
        <h1 className="text-white text-lg font-semibold">Products</h1>
        <p className="text-[#9CA3AF] text-xs">{productsData?.length || 0} products</p>
      </div>

      {(isPending || isFetching) ? <PageLoader /> : (
        <ul className="px-7 flex flex-wrap gap-2">
          {productsData.map((product) => (
            <li className="w-[48%]">
              <div className="w-full">
                <img className="w-full" src={product.images[0]} />
              </div>
              <div className="bg-[#1F1F1F]">
                <p className="text-sm">{product.category}</p>
                <h1 className="text-lg">{product.name}</h1>
                <p className="text-sm"><Star className="fill-amber-300 size-3" /> {product.averageRating} {`(${product.totalReviews})`}</p>
              </div>
            </li>
          ))}
        </ul>
      )}


    </div>
  )
}

export default HomePage