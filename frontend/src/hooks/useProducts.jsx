import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../lib/api";

const useProducts = () => {

  useEffect(() => {
    const data = useQuery({
      queryKey: ['products'],
      queryFn: productsApi.getAllProducts
    })
  }, [])
  console.log(data, "Ashop")
  return data;
}

export default useProducts