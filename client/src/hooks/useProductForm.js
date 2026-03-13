import { useState } from "react";
import { addProduct } from "../services/productService";

const TALLAS_IDS = { S: 1, M: 2, L: 3, XL: 4, XXL: 5, XXXL: 6 };

export function useProductForm(product) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      const form = e.target;
      const formDataObj = Object.fromEntries(new FormData(form));

      const variants = {};

      for (const [key, value] of Object.entries(formDataObj)) {

        if (key.startsWith("size_")) {

          const sizeName = key.replace("size_", "");
          const id = TALLAS_IDS[sizeName];

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
        image: form.image.files[0],
        variants
      };

      await addProduct(productData);

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