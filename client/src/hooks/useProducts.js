import { useEffect, useState } from "react";
import { getProducts, deleteProductService, getProductsByCategory } from "../services/productService";

export const useProducts = (categoryId = null) => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    await deleteProductService(id);
    loadProducts();
  };

  const loadProducts = async () => {
    const data = categoryId
     ? await getProductsByCategory(categoryId)
     : await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, [categoryId]);

  return { products, loadProducts, deleteProduct };
};
