import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProductService,
  getFilteredProducts,
} from "../services/productService";

export const useProducts = (
  categoryIds = [],
  brandsIds = [],
  sizesIds = [],
  minPrice = null,
  maxPrice = null,
) => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    await deleteProductService(id);
    loadProducts();
  };

  const loadProducts = async () => {
    const hasCategories = categoryIds.length > 0;
    const hasBrands = brandsIds.length > 0;
    const hasSizes = sizesIds.length > 0;
    const hasPrice = minPrice != null || maxPrice != null;

    if (hasCategories || hasBrands || hasSizes || hasPrice) {
      const data = await getFilteredProducts(
        categoryIds,
        brandsIds,
        sizesIds,
        minPrice,
        maxPrice,
      );
      setProducts(data);
    } else {
      const data = await getProducts();
      setProducts(data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [
    JSON.stringify(categoryIds),
    JSON.stringify(brandsIds),
    JSON.stringify(sizesIds),
    minPrice,
    maxPrice,
  ]);

  return { products, loadProducts, deleteProduct };
};
