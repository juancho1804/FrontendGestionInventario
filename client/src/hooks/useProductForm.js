import { useState } from "react";
import { addProduct, editProduct } from "../services/productService";


export function useProductForm(product, sizes = [], images = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const form = e.target;
      const formDataObj = Object.fromEntries(new FormData(form));
      const sizeMap = Object.fromEntries(sizes.map((s) => [s.name, s.id]));

      const variants = {};

      for (const [key, value] of Object.entries(formDataObj)) {
        if (key.startsWith("size_")) {
          const sizeName = key.replace("size_", "");
          const id = sizeMap[sizeName];

          if (id) {
            variants[id] = Number(value) || 0;
          }
        }
      }

      const productData = {
        id: product?.id,
        categoryId: Number(formDataObj.category),
        brandId: Number(formDataObj.brand),
        color: formDataObj.color,
        price: Number(formDataObj.price),
        images,
        variants,
      };

      if(product?.id){
        await editProduct(productData); 
      }else{
        await addProduct(productData);
      }

      return { success: true };
    } catch (err) {
      setError(err.message || "Error desconocido");

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, error };
}
