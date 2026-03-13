import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export const useProducts = () => {

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
  const data = await getProducts();
  setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loadProducts };
};