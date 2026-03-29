import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import { useSizes } from "../hooks/useSizes";
import FilterSection from "./FilterSection";

export default function FilterPanel({ panelRef, open, filterState }) {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const { brands, loading: brandLoading, error: brandError } = useBrands();
  const { sizes, loading: sizeLoading, error: sizeError } = useSizes();

  const { selectedCats, setSelectedCats, selectedBrands, setSelectedBrands, selectedSizes, setSelectedSizes, toggleItem, clearAll, applyFilters } = filterState;

  return (
    <div
      ref={panelRef}
      style={{
        position: "absolute", top: "calc(100% + 6px)", left: 0, width: 260,
        background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 10,
        zIndex: 999, boxShadow: "0 10px 36px rgba(0,0,0,.55)",
        transition: "opacity .18s ease, transform .18s ease",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        pointerEvents: open ? "all" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px", borderBottom: "1px solid #2a2a2a" }}>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Filtros</span>
        <button onClick={clearAll} style={{ background: "none", border: "none", color: "#e53935", fontSize: 11, cursor: "pointer", padding: 0 }}>
          Limpiar todo
        </button>
      </div>

      <FilterSection title="Categoría" items={categories} selected={selectedCats} onToggle={(id) => toggleItem(setSelectedCats, id)} loading={catLoading} error={catError} />
      <FilterSection title="Marca" items={brands} selected={selectedBrands} onToggle={(id) => toggleItem(setSelectedBrands, id)} loading={brandLoading} error={brandError} />
      <FilterSection title="Talla" items={sizes} selected={selectedSizes} onToggle={(id) => toggleItem(setSelectedSizes, id)} loading={sizeLoading} error={sizeError} columns={2} />

      <div style={{ padding: "10px 14px 14px" }}>
        <button
          onClick={() => applyFilters(() => {})}
          style={{ width: "100%", background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}