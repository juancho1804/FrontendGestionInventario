import axiosClient from "../api/axiosClient";

export const fetchProducts = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};

export const createProduct = async (productData) => {

  const response = await axiosClient.post("/products", productData);

  return response.data;
};