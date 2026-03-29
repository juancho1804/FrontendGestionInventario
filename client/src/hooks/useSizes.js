import { useState, useEffect } from "react";
import { getSizes } from "../services/sizesService";

export const useSizes = () => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSizes = async () => {
      try {
        const data = await getSizes();
        setSizes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSizes();
  }, []); // [] — solo se ejecuta una vez al montar el componente

  return { sizes, loading, error };
};