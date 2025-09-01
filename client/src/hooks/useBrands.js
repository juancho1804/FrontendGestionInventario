import { useEffect, useState } from "react";

export function useBrands() {
  const [brands, setBrands] = useState([]);
  const base = import.meta.env.VITE_API_URL || "http://localhost:8001";

  useEffect(() => {
    fetch(`${base}/brands`)
      .then(res => res.json())
      .then(setBrands)
      .catch(err => console.error("Error al cargar marcas", err));
  }, [base]);

  return { brands };
}
