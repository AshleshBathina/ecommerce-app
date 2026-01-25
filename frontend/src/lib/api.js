import axiosInstance from "./axios";

export const productsApi = {
  getAllProducts: async () => {
    const { data } = await axiosInstance.get('/products');
    console.log(data);
    return data;
  }
}

