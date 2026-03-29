import { useState } from "react";

export function useFilterState(onFiltersChange) {
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [selectedSizes, setSelectedSizes] = useState(new Set());

  function toggleItem(setFn, id) {
    setFn((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function clearAll() {
    setSelectedCats(new Set());
    setSelectedBrands(new Set());
    setSelectedSizes(new Set());
  }

  function applyFilters(onClose) {
    onClose();
    if (onFiltersChange)
      onFiltersChange({
        categories: [...selectedCats],
        brands: [...selectedBrands],
        sizes: [...selectedSizes],
      });
  }

  const totalSelected = selectedCats.size + selectedBrands.size + selectedSizes.size;

  return {
    selectedCats, setSelectedCats,
    selectedBrands, setSelectedBrands,
    selectedSizes, setSelectedSizes,
    toggleItem, clearAll, applyFilters,
    totalSelected,
  };
}