import { useEffect, useState } from "react";
import { getProducts, deleteProductService, getFilteredProducts } from "../services/productService";

export const useProducts = (categoryIds = [], brandsIds = []) => {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    await deleteProductService(id);
    loadProducts();
  };

  const loadProducts = async () => {
    const hasCategories = categoryIds.length > 0;
    const hasBrands = brandsIds.length > 0;

    if(hasCategories || hasBrands){
      const data = await getFilteredProducts(categoryIds , brandsIds);
      setProducts(data);
    }else{
      const data = await getProducts();
      setProducts(data);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [JSON.stringify(categoryIds), JSON.stringify(brandsIds)]);

  return { products, loadProducts, deleteProduct };
};
