import {
  fetchProductsApi,
  fetchProductsByCategoryApi,
  createProductApi,
  deleteProductApi,
  editProductApi,
  getFilteredProductsApi,
  findProductApi,
} from "../data/productApi";

export const getProducts = async () => {
  const products = await fetchProductsApi();
  return products;
};

export const getFilteredProducts = async (categoryIds, brandsIds, sizesIds) => {
  const products = await getFilteredProductsApi(
    categoryIds,
    brandsIds,
    sizesIds,
  );
  return products;
};

export const getProductsByCategory = async (categoryId) => {
  const products = await fetchProductsByCategoryApi(categoryId);
  return products;
};

export const deleteProductService = async (productId) => {
  const status = await deleteProductApi(productId);
  if (status == 204) {
    return true;
  }
  return false;
};

export const editProduct = async (productData) => {
  const formData = new FormData();

  formData.append("id", productData.id);
  formData.append("categoryId", productData.categoryId);
  formData.append("colorId", productData.colorId);
  formData.append("brandId", productData.brandId);
  formData.append("price", productData.price);
  // URLs que ya existían y el usuario conservó
  const existingImages = Array.from(productData.images || [])
    .filter(img => typeof img === "string");
  existingImages.forEach(url => formData.append("existingImages", url));

  // Archivos nuevos que el usuario agregó
  const newImages = Array.from(productData.images || [])
    .filter(img => img instanceof File);
  newImages.forEach(file => formData.append("images", file));
  
  formData.append(
    "productVariantRequest",
    JSON.stringify({
      variants: productData.variants,
    }),
  );

  return await editProductApi(formData);
};

export const addProduct = async (productData) => {
  const formData = new FormData();

  formData.append("categoryId", productData.categoryId);
  formData.append("colorId", productData.colorId);
  formData.append("brandId", productData.brandId);
  formData.append("price", productData.price);
  const images = Array.from(productData.images || []);
  if (images.length) {
    images.forEach((image) => formData.append("images", image));
  }

  formData.append(
    "productVariantRequest",
    JSON.stringify({
      variants: productData.variants,
    }),
  );

  return await createProductApi(formData);
};

export const findProductService = async (productId) => {
  const response = await findProductApi(productId);
  return response;
};
