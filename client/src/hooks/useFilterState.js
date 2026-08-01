import { useState } from "react";

export function useFilterState(onFiltersChange) {
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [selectedSizes, setSelectedSizes] = useState(new Set());
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function toggleItem(setFn, id) {
    setFn((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function clearAll() {
    setSelectedBrands(new Set());
    setSelectedSizes(new Set());
    setMinPrice("");
    setMaxPrice("");
  }

  function applyFilters(onClose) {
    onClose();
    if (onFiltersChange)
      onFiltersChange({
        brands: [...selectedBrands],
        sizes: [...selectedSizes],
        minPrice: minPrice === "" ? null : Number(minPrice),
        maxPrice: maxPrice === "" ? null : Number(maxPrice),
      });
  }

  function resetFilters() {
    setSelectedBrands(new Set());
    setSelectedSizes(new Set());
    setMinPrice("");
    setMaxPrice("");
  }

  const totalSelected =
    selectedBrands.size +
    selectedSizes.size +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" ? 1 : 0);

  return {
    selectedBrands,
    setSelectedBrands,
    selectedSizes,
    setSelectedSizes,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    toggleItem,
    clearAll,
    applyFilters,
    totalSelected,
    resetFilters,
  };
}
