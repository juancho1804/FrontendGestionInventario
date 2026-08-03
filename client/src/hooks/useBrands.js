import { useState, useEffect } from "react";
import { addBrand, deleteBrand, getBrands } from "../services/brandsService";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const createBrand = async (name) => {
    const created = await addBrand(name);
    await loadBrands();
    return created;
  };

  const removeBrand = async (brandId) => {
    await deleteBrand(brandId);
    await loadBrands();
  };

  return { brands, loading, error, loadBrands, createBrand, removeBrand };
};
