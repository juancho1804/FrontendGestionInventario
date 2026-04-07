import { useState, useEffect } from "react";
import { getColors } from "../services/colorService";

export const useColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadColors = async () => {
      try {
        const data = await getColors();
        setColors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, []); // [] — solo se ejecuta una vez al montar el componente

  return { colors, loading, error };
};