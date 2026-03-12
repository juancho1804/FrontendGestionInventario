import { fetchProducts } from "../data/productApi";

export const getProducts = async () => {
  const products = await fetchProducts();
  return products;
};