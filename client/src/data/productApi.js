import axiosClient from "../api/axiosClient";

export const fetchProducts = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};