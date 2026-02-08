import axiosInstance from "./axios";

export const productsApi = {
  getAllProducts: async () => {
    const { data } = await axiosInstance.get('/products');
    return data;
  },


}

export const wishlistApi = {
  getWishlist: async () => {
    const { data } = await axiosInstance.get('/users/wishlist')
    return data.wishlist
  },

  removeFromWishlist: async (productId) => {
    const { data } = await axiosInstance.delete(`/users/wishlist/${productId}`);
    return data.wishlist
  },

  addToWishlist: async (productId) => {
    console.log("request sent")
    const { data } = await axiosInstance.post('/users/wishlist', { productId })
    console.log("request success")
    return data.wishlist
  }
}

export const cartApi = {
  getCart: async () => {
    const { data } = await axiosInstance.get('/cart/')
    return data.cart
  },

  addToCart: async (productId) => {
    const { data } = await axiosInstance.post('/cart/', { productId })
    return data.cart
  },

  updateCartItem: async (productId) => {
    const { data } = await axiosInstance.put(`/cart/${productId}`)
    return data.cart
  },

  removeFromCart: async (productId) => {
    const { data } = await axiosInstance.delete(`/cart/${productId}`)
    return data.cart;
  },

  clearCart: async () => {
    const { data } = await axiosInstance.delete('/cart/delete')
    return data
  }
}