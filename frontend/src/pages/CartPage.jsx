import { LoaderIcon, Minus, Plus, Trash2 } from "lucide-react";
import useCart from "../hooks/useCart"

const CartPage = () => {

  const { cart, updateCartItem, isAddingToCart, isRemovingFromCart, removeFromCart } = useCart()

  const isBusy = isAddingToCart || isRemovingFromCart;
  const cartItems = cart?.items || [];

  const subTotal = cartItems?.reduce((accumulator, cartItem) => {
    return accumulator + cartItem.product.price * cartItem.quantity
  }, 0)

  const updateProductQuantity = ({ productId, quantity }) => {
    if (quantity > 0) {
      updateCartItem({ productId, quantity });
    }
  }

  return (
    <div className="flex flex-col min-h-screen h-full bg-[#0F0F0F] pt-7 pb-25">
      <div className="px-7 flex  items-center">
        <h1 className="font-bold text-white text-2xl mr-2">Cart</h1>
        <p className="rounded-full flex justify-center items-center h-5 w-5 p-2 m-0 font-bold text-xs bg-green-400">{cartItems?.length}</p>
      </div>

      <ul className="flex flex-col px-4 mt-4 gap-4">
        {cartItems.map(cartItem => {
          const product = cartItem?.product || {};
          const quantity = cartItem?.quantity || 0;
          return (
            <li className="bg-[#222222] p-4 rounded-2xl flex" key={cartItem._id}>
              <div className="relative mr-4 size-25">
                <img className="rounded-xl size-full" src={product?.images[0]} />
                <span className="absolute right-3 top-2 text-green-950 font-bold bg-green-600 text-xs px-3 w-5 rounded-2xl flex justify-center items-center">x{cartItem.quantity}</span>
              </div>
              <div className="flex flex-col gap-2 w-[65%]">
                <h1 className="text-white text-md font-semibold">{product.name}</h1>
                <p className="text-green-400 font-semibold gap-2 flex items-center text-xl">₹{(product.price * quantity).toFixed(2)} <span className="text-white/60 text-xs font-normal">₹{Math.round(product.price * 100) / 100} each</span></p>

                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-4">
                    <button disabled={isBusy} className="disabled:opacity-50 disabled:cursor-not-allowed text-white size-7 flex items-center rounded-full p-1 justify-center" onClick={() => updateProductQuantity({ productId: product._id, quantity: quantity - 1 })}>
                      {isBusy ? <LoaderIcon className="text-white animate-spin size-7" /> : <Minus className="size-4" />}
                    </button>
                    <p className="text-white text-sm">{cartItem.quantity}</p>
                    <button className="disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 size-7 flex items-center rounded-full p-1 justify-center" onClick={() => updateProductQuantity({
                      productId: product._id, quantity: quantity + 1
                    })}>
                      {isBusy ? <LoaderIcon className="text-white animate-spin size-7" /> : <Plus className="size-4" />}
                    </button>
                  </div>
                  <button className="bg-red-800/20 p-2 rounded-full" onClick={() => removeFromCart(product._id)}>
                    <Trash2 className="text-red-500 size-5" />
                  </button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="p-4 flex flex-col">
        <div className="rounded-2xl bg-[#222222] p-4">
          <h1 className="text-white text-lg font-semibold">Summary</h1>
          <div className="w-full flex justify-between mt-3">
            <p className="text-md text-white/50">Subtotal</p>
            <p className="text-white">₹{Math.round(subTotal * 100) / 100}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className="text-md text-white/50">Shipping Charge</p>
            <p className="text-white">₹10</p>
          </div>
          <div className="flex flex-row justify-between mt-3">
            <p className="text-white font-semibold text-lg">Total</p>
            <p className="font-bold text-green-400 text-xl">₹{Math.round((subTotal + 10) * 100) / 100}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage