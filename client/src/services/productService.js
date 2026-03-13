import { fetchProducts } from "../data/productApi";
import { createProduct } from "../data/productApi";

export const getProducts = async () => {
  const products = await fetchProducts();
  return products;
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

  return await createProduct(formData);
};
