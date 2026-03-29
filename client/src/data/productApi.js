import axiosClient from "../api/axiosClient";

export const fetchProductsApi = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};

export const getFilteredProductsApi = async (categoryIds, brandsIds) => {
  const response = await axiosClient.get("/products/filter", {
    params: {
      cats: categoryIds,
      brands: brandsIds
    }
  });
  return response.data;
};

export const fetchProductsByCategoryApi = async (categoryId) =>{
  const response = await axiosClient.get("/products/"+categoryId);
  return response.data;
}

export const createProductApi = async (productData) => {
  const response = await axiosClient.post("/products", productData);
  return response.data;
};

export const editProductApi = async (productData) => {
  const response = await axiosClient.put("/products", productData);

  return response.data;
};

export const deleteProductApi = async (productId) => {
  const response = await axiosClient.delete(`/products/${productId}` );

  return response.status;
} 