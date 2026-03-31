import { useState, useEffect, useRef } from "react";
import { useFilterState } from "../hooks/useFilterState";
import FilterPanel from "./FilterPanel";
import AddProductButton from "./AddProductButton";

export default function FilterMenu({ showAddButton = false, onAdd, onFiltersChange }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const filterState = useFilterState(onFiltersChange);

  useEffect(() => {
    function handleOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target) && !triggerRef.current.contains(e.target))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="d-flex flex-wrap align-items-center gap-3 py-4" style={{ paddingLeft: "190px" }}>
      <div style={{ position: "relative" }}>
        <button
          ref={triggerRef}
          onClick={() => setOpen((o) => !o)}
          className="btn text-white d-flex align-items-center gap-2"
          style={{  borderRadius: 8, padding: "7px 14px" }}
        >
          <i className="bi bi-filter"></i>
          <a style={{fontSize: 16}}>Filtrar</a>
          {filterState.totalSelected > 0 && (
            <span style={{ background: "#e53935", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {filterState.totalSelected}
            </span>
          )}
          <span style={{ fontSize: 10, display: "inline-block", transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        <FilterPanel
          panelRef={panelRef}
          open={open}
          filterState={{ ...filterState, applyFilters: (fn) => filterState.applyFilters(() => setOpen(false)) }}
        />
      </div>

      {showAddButton && <AddProductButton onClick={onAdd} />}
    </div>
  );
}
