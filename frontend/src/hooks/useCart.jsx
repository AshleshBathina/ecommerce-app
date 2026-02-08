import { cartApi } from "../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useCart = () => {
  const queryClient = useQueryClient()

  const { data: cart, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart
  })

  const addToCartMutation = useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: (data) => {
      console.log('✅ addToCart SUCCESS:', data)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('❌ addToCart ERROR:', error)
    }
  })

  const updateCartItemMutation = useMutation({
    queryFn: cartApi.updateCartItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const removeFromCartMutation = useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: (data) => {
      console.log('✅ removeFromCart SUCCESS:', data)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error) => {
      console.error('❌ removeFromCart ERROR:', error)
    }
  })

  const clearCartMutation = useMutation({
    queryFn: cartApi.clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] })
  })

  const isInCart = (productId) => {
    const result = cart?.items?.some(item => item.product._id?.toString() === productId?.toString()) ?? false;
    console.log('🔍 isInCart check:', { productId, cartItems: cart?.items?.length, result, items: cart?.items })
    return result;
  }

  const toggleCart = (productId) => {
    console.log('🔄 toggleCart called with productId:', productId)
    if (isInCart(productId)) {
      console.log('➖ Item IN cart, removing...')
      removeFromCartMutation.mutate(productId)
    } else {
      console.log('➕ Item NOT in cart, adding...')
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