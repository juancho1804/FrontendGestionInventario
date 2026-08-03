import { useState, useEffect, useCallback } from "react";
import { addColor, deleteColor, getColors } from "../services/colorService";

export const useColors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadColors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getColors();
      setColors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadColors();
  }, []); // [] — solo se ejecuta una vez al montar el componente

  const createColor = async (colorData) => {
    const created = await addColor(colorData);
    await loadColors();
    return created;
  };

  const removeColor = async (id) => {
    await deleteColor(id);
    await loadColors();
  };

  return { colors, loading, error, loadColors, createColor, removeColor };
};
