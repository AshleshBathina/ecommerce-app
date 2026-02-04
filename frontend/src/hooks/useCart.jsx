import { cartApi } from "../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useCart = () => {
  const queryClient = useQueryClient()

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart
  })

  const addToCartMutation = useMutation({
    queryFn: cartApi.addToCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const updateCartItemMutation = useMutation({
    queryFn: cartApi.updateCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const removeFromCartMutation = useMutation({
    queryFn: cartApi.removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const clearCartMutation = useMutation({
    queryFn: cartApi.clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const isInCart = (productId) => {
    return cart?.items?.some(item => item.product._id === productId) ?? false;
  }

  const toggleCart = (productId) => {
    if (isInCart(productId)) {
      removeFromCartMutation.mutate(productId)
    } else {
      addToCartMutation.mutate(productId)
    }
  }

  return {
    cart,
    addToCart: addToCartMutation.mutate,
    updateCartItem: updateCartItemMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    toggleCart,
    isInCart,
    isAddingToCart: updateCartItemMutation.isPending || addToCartMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending || clearCartMutation.isPending
  }
}

export default useCart