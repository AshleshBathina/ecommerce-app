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
    const { data } = await axiosInstance.post('/users/wishlist', { productId })
    return data.wishlist
  }
}