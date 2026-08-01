import { useEffect, useState, useCallback } from "react";
import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Carga inicial: array vacío real, se ejecuta UNA sola vez sin importar
  // si loadCategories cambia de referencia entre renders
  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createCategory = async (categoryData) => {
    const created = await addCategory(categoryData);
    await loadCategories();
    return created;
  };

  const updateCategory = async (id, categoryData) => {
    const updated = await editCategory(id, categoryData);
    await loadCategories();
    return updated;
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    await loadCategories();
  };

  return {
    categories,
    loading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    removeCategory,
  };
}