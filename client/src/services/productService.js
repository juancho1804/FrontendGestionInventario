import { fetchProductsApi,fetchProductsByCategoryApi, createProductApi, deleteProductApi, editProductApi } from "../data/productApi";

export const getProducts = async () => {
  const products = await fetchProductsApi();
  return products;
};

export const getProductsByCategory = async (categoryId) => {
  const products = await fetchProductsByCategoryApi(categoryId);
  return products;
};

export const deleteProductService = async (productId) => {
  const status = await deleteProductApi(productId);
  if(status == 204){
    return true;
  }
  return false;
};

export const editProduct = async (productData) => {
  const formData = new FormData();

  formData.append("id", productData.id);
  formData.append("categoryId", productData.categoryId);
  formData.append("color", productData.color);
  formData.append("brandId", productData.brandId);
  formData.append("price", productData.price);
  if (productData.image) {
    formData.append("image", productData.image);
  }

  formData.append(
    "productVariantRequest",
    JSON.stringify({
      variants: productData.variants,
    }),
  );

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  return await editProductApi(formData);
};




export const addProduct = async (productData) => {
  const formData = new FormData();

  formData.append("categoryId", productData.categoryId);
  formData.append("color", productData.color);
  formData.append("brandId", productData.brandId);
  formData.append("price", productData.price);
  if (productData.image) {
    formData.append("image", productData.image);
  }

  formData.append(
    "productVariantRequest",
    JSON.stringify({
      variants: productData.variants,
    }),
  );

  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  return await createProductApi(formData);
};
