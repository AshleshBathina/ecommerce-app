import axiosInstance from "./axios";

export const productsApi = {
  getAllProducts: async () => {
    console.log('Request sent')
    const { data } = await axiosInstance.get('/products');
    console.log('Request done: ', data)
    console.log(data);
    return data;
  }
}

