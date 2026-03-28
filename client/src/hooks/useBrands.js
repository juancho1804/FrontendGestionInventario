import { useState, useEffect } from "react";
import { getBrands } from "../services/brandsService";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []); // [] — solo se ejecuta una vez al montar el componente

  return { brands, loading, error };
};