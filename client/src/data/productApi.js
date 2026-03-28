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
  console.log("PRODUCTOS: "+response.data);

  return response.data;
};

export const fetchProductsByCategoryApi = async (categoryId) =>{
  const response = await axiosClient.get("/products/"+categoryId);
  return response.data;
}

export const createProductApi = async (productData) => {
  console.log("entro a crear");
  console.log(productData.precio);
  const response = await axiosClient.post("/products", productData);
  return response.data;
};

export const editProductApi = async (productData) => {
  console.log("entro a editar");
  const response = await axiosClient.put("/products", productData);

  return response.data;
};

export const deleteProductApi = async (productId) => {
  const response = await axiosClient.delete(`/products/${productId}` );

  return response.status;
} 