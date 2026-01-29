import useProducts from "../hooks/useProducts"
import { Settings2, Search, LayoutGrid, Handbag, Trophy, LibraryBig, MonitorSmartphone, Star, Heart } from "lucide-react"

import PageLoader from "../components/PageLoader"

const { data: products, isLoading, isError } = useProducts();

const categories = [
  {
    id: 'ALL',
    title: 'All',
    icon: <LayoutGrid className="size-8" />
  },
  {
    id: 'ELECTRONICS',
    title: 'Electronics',
    icon: <MonitorSmartphone className="size-8" />
  },
  {
    id: 'FASHION',
    title: 'Fashion',
    icon: <Handbag className="size-8" />
  },
  {
    id: 'SPORTS',
    title: 'Sports',
    icon: <Trophy className="size-8" />
  },
  {
    id: 'BOOKS',
    title: 'Books',
    icon: <LibraryBig className="size-8" />
  }

]

const HomePage = () => {



  return (
    <div className="flex flex-col min-h-screen h-full bg-[#0F0F0F] pt-7">
      <div className="flex justify-between px-7">
        <div className="">
          <h1 className="font-bold text-white text-2xl">Products Page</h1>
          <p className="text-[#9CA3AF] text-xs">Shop whatever you want.</p>
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

      <ul className="flex items-center px-7 mt-3 overflow-x-auto no-scrollbar gap-3 scroll-smooth">
        {categories.map((category) => (
          <li key={category.id} className="p-4 first-child bg-[#222222] text-gray-300 first:bg-green-500 first:text-slate-900 rounded-2xl">
            <button className="flex justify-center items-center">
              {category.icon}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-between items-center px-7">
        <h1 className="text-white text-lg font-semibold">Products</h1>
        <p className="text-[#9ca3afb8] text-xs">{productsData?.length || 0} products</p>
      </div>

      {(isPending || isFetching) ? <PageLoader /> : (
        <ul className="px-7 mt-2 flex flex-wrap gap-4">
          {productsData.map((product) => (
            <li key={product._id} className="w-40 h-63 rounded-2xl">
              <div className="h-33 rounded-t-2xl relative overflow-hidden flex justify-center items-center">
                <img className="w-full h-full" src={product.images[0]} />
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm size-9 rounded-3xl flex justify-center items-center">
                  <Heart className="size-5 text-white" />
                </span>
              </div>
              <div className="bg-[#1F1F1F] h-30 rounded-b-2xl p-3">
                <p className="text-[10px] text-neutral-400 mb-1" >{product.category}</p>
                <h1 className="text-xs mb-1 font-medium text-white">{product.name}</h1>
                <p className="flex text-sm gap-1 items-center text-white text-[10px]"><Star className="fill-amber-300 size-3 text-amber-400" />{product.averageRating}<span className="text-neutral-400">{`(${product.totalReviews})`}</span></p>

                <div className="mt-3">
                  <p className="text-green-400 font-bold text-md">₹{product.price}</p>

                </div>
              </div>


            </li>
          ))}
        </ul>
      )}


    </div>
  )
}

export default HomePage