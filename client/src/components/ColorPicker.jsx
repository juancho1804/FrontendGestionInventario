import { useState, useRef, useEffect } from "react";

export default function ColorPicker({ colors, value, onChange, loading }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = colors.find(c => String(c.id) === String(value));

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: "#1f1f1f", border: "1px solid #333", borderRadius: 8,
          padding: "9px 12px", cursor: "pointer", display: "flex",
          alignItems: "center", gap: 8, color: selected ? "#fff" : "#666",
          fontSize: 14,
        }}
      >
        {selected ? (
          <>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: selected.hexCode, border: "1px solid #555", flexShrink: 0 }} />
            {selected.name}
          </>
        ) : (
          loading ? "Cargando..." : "Seleccione..."
        )}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#555" }}>▼</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 8,
          zIndex: 999, maxHeight: 200, overflowY: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}>
          {colors.map(color => (
            <div
              key={color.id}
              onClick={() => { onChange(String(color.id)); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", cursor: "pointer",
                background: String(color.id) === String(value) ? "#2a2a2a" : "transparent",
                transition: "background .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#2a2a2a"}
              onMouseLeave={e => e.currentTarget.style.background = String(color.id) === String(value) ? "#2a2a2a" : "transparent"}
            >
              <span style={{ width: 14, height: 14, borderRadius: "50%", background: color.hexCode, border: "1px solid #555", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#fff" }}>{color.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}