import { useState } from "react";
import { addProductApi } from "../services/productService";

export function useProductForm(onSuccess){
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    

    try {
      const form = e.target;

      const sizes = ["S","M","L","XL","XXL","XXXL"]

      const variants = sizes.reduce((acc, size, index)=>{
        acc[index +1]= form[`size_${size}`].value || 0;
        return acc;
      }, {});

      const productData = {
        color: form.color.value,
        price: form.price.value,
        categoryId: form.category.value, 
        brandId: form.brand.value, 
        image: form.image.files[0],
        variants
      };

      const saved = await addProductApi(productData);
      console.log("Producto guardado",saved);
      if(onSuccess){
        console.log("FORM llamando a onsuccess");
        onSuccess(saved);
        console.log("FORM llamo a onsuccess");
        console.log("[FORM] Producto que devolvió el backend al guardar:", saved);

      }
      form.reset();
    } catch (err){
        setError(err.message);

    }finally{
        setLoading(false);
    }
};
return{handleSubmit,loading,error};



}