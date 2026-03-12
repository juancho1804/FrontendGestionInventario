import axiosClient from "../api/axiosClient";

export const fetchProducts = async () => {
  const response = await axiosClient.get("/products");
  return response.data;
};

export const createProduct = async (productData) => {

  const formData = new FormData();

  formData.append("categoryId", productData.categoryId);
  formData.append("color", productData.color);
  formData.append("brandId", productData.brandId);
  formData.append("price", productData.price);
  formData.append("image", productData.image);

  formData.append(
    "productVariantRequest",
    JSON.stringify({ variants: productData.variants })
  );

  const response = await axiosClient.post("/products", formData);

  return response.data;
};