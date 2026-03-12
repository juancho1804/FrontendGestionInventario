import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export const useProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return { products };
};