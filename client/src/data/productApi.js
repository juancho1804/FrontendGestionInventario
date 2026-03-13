import axiosClient from "../api/axiosClient";

export const fetchProductsApi = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};

export const createProductApi = async (productData) => {

  const response = await axiosClient.post("/products", productData);

  return response.data;
};



export const deleteProductApi = async (productId) => {
  const response = await axiosClient.delete(`/products/${productId}` );

  return response.status;
} 