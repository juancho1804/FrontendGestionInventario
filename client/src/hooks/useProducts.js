import { useEffect, useState } from "react";
import { getProducts, deleteProductService } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    await deleteProductService(id);
    loadProducts();
  };

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return { products, loadProducts, deleteProduct };
};
