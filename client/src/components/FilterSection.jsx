import { useState } from "react";

function CheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.5L3.5 6L8 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FilterSection({ title, items, selected, onToggle, loading, error, columns = 1 }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ borderBottom: "1px solid #2a2a2a" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", cursor: "pointer" }}
      >
        <span style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
          {title}
        </span>
        <span style={{ color: "#555", fontSize: 18, lineHeight: 1, display: "inline-block", transition: "transform .2s", transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </button>

      {open && (
        <div style={{ padding: "2px 14px 10px" }}>
          {loading && <span style={{ fontSize: 12, color: "#666", padding: "4px 0", display: "block" }}>Cargando...</span>}
          {error && <span style={{ fontSize: 12, color: "#e53935", padding: "4px 0", display: "block" }}>Error: {error}</span>}

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: "0 8px" }}>
            {items.map((item) => {
              const checked = selected.has(item.id);
              return (
                <div key={item.id} onClick={() => onToggle(item.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer" }}
                >
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: checked ? "none" : "1.5px solid #444", background: checked ? "#e53935" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .12s" }}>
                    {checked && <CheckIcon />}
                  </span>
                  <span style={{ fontSize: 13, color: checked ? "#fff" : "#aaa", transition: "color .1s" }}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}