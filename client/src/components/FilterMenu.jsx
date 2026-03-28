import { useState, useEffect, useRef } from "react";
import { useCategories } from "../hooks/useCategories";
import { useBrands } from "../hooks/useBrands";
import AddProductButton from "../components/AddProductButton";

// Icono de check (palomita) que aparece dentro del checkbox cuando está seleccionado
function CheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path
        d="M1 3.5L3.5 6L8 1"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * FilterSection — sección colapsable dentro del panel de filtros.
 *
 * Props:
 * - title: texto del encabezado (ej. "Categoría" o "Marca")
 * - items: array de objetos { id, name } que vienen del hook
 * - selected: Set con los ids actualmente seleccionados
 * - onToggle(id): función que activa/desactiva un item por su id
 * - loading: boolean — muestra "Cargando..." mientras llega la data
 * - error: string | null — muestra el error si el fetch falló
 */
function FilterSection({ title, items, selected, onToggle, loading, error }) {
  // Controla si la sección está expandida o colapsada
  const [open, setOpen] = useState(true);

  return (
    <div style={{ borderBottom: "1px solid #2a2a2a" }}>
      {/* Encabezado clickeable que expande/colapsa la sección */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 14px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            color: "#888",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        {/* El "+" rota 45° para convertirse en "×" cuando está abierto */}
        <span
          style={{
            color: "#555",
            fontSize: 18,
            lineHeight: 1,
            display: "inline-block",
            transition: "transform .2s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>

      {/* Lista de opciones — solo se renderiza si la sección está abierta */}
      {open && (
        <div style={{ padding: "2px 14px 10px" }}>
          {/* Estados de carga y error */}
          {loading && (
            <span
              style={{
                fontSize: 12,
                color: "#666",
                padding: "4px 0",
                display: "block",
              }}
            >
              Cargando...
            </span>
          )}
          {error && (
            <span
              style={{
                fontSize: 12,
                color: "#e53935",
                padding: "4px 0",
                display: "block",
              }}
            >
              Error: {error}
            </span>
          )}

          {/* Renderiza un item por cada categoría o marca */}
          {items.map((item) => {
            // Verifica si este item está en el Set de seleccionados
            const checked = selected.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => onToggle(item.id)} // al hacer click llama a toggleItem del padre
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 0",
                  cursor: "pointer",
                }}
              >
                {/* Checkbox visual: rojo con palomita si está checked, vacío si no */}
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: checked ? "none" : "1.5px solid #444",
                    background: checked ? "#e53935" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background .12s",
                  }}
                >
                  {checked && <CheckIcon />}
                </span>

                {/* Texto del item: blanco si seleccionado, gris si no */}
                <span
                  style={{
                    fontSize: 13,
                    color: checked ? "#fff" : "#aaa",
                    transition: "color .1s",
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * FilterMenu — barra principal con filtros, buscador y botón agregar.
 *
 * Props:
 * - showAddButton: boolean — si mostrar el botón "Agregar Producto"
 * - onAdd: función que se ejecuta al hacer click en Agregar
 * - onFiltersChange({ categories, brands }): devuelve ambos arrays de ids juntos
 */
export default function FilterMenu({
  showAddButton = false,
  onAdd,
  onFiltersChange,
}) {
  // Trae las categorías desde el hook (fetch al endpoint de categorías)
  const { categories, loading: catLoading, error: catError } = useCategories();
  // Trae las marcas desde el hook (fetch al endpoint de marcas)
  const { brands, loading: brandLoading, error: brandError } = useBrands();

  // Controla si el panel de filtros está abierto o cerrado
  const [open, setOpen] = useState(false);

  // Sets con los ids seleccionados — se usan Sets para búsqueda O(1) con .has()
  const [selectedCats, setSelectedCats] = useState(new Set());
  const [selectedBrands, setSelectedBrands] = useState(new Set());

  // Refs para detectar clicks fuera del panel y cerrarlo
  const panelRef = useRef(null); // referencia al panel desplegable
  const triggerRef = useRef(null); // referencia al botón "Filtrar"

  /**
   * Efecto que escucha clicks en toda la página.
   * Si el click NO fue dentro del panel NI en el botón trigger, cierra el panel.
   * Se limpia al desmontar el componente para evitar memory leaks.
   */
  useEffect(() => {
    function handleOutside(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  /**
   * toggleItem — agrega o quita un id del Set de seleccionados.
   *
   * Recibe el setter (setSelectedCats o setSelectedBrands) y el id a toggle.
   * Crea un nuevo Set (inmutabilidad) para que React detecte el cambio de estado.
   */
  function toggleItem(setFn, id) {
    setFn((prev) => {
      const next = new Set(prev); // copia el Set actual
      next.has(id) ? next.delete(id) : next.add(id); // quita si existe, agrega si no
      return next;
    });
  }

  /**
   * clearAll — resetea todos los filtros seleccionados.
   * Reemplaza ambos Sets con Sets vacíos nuevos.
   */
  function clearAll() {
    setSelectedCats(new Set());
    setSelectedBrands(new Set());
  }

  /**
   * applyFilters — confirma y envía los filtros seleccionados al componente padre.
   *
   * 1. Cierra el panel
   * 2. Convierte los Sets a arrays y los pasa juntos por onFiltersChange
   *    [...selectedCats] → [1, 3] (ids seleccionados)
   */
  function applyFilters() {
    const categories = [...selectedCats];
    const brands = [...selectedBrands];

    console.log("categorias seleccionadas:", categories);
    console.log(
      "tipos:",
      categories.map((id) => typeof id),
    ); // ← clave
    console.log("brands seleccionadas:", brands);
    setOpen(false);
    if (onFiltersChange)
      onFiltersChange({
        categories: [...selectedCats],
        brands: [...selectedBrands],
      });
  }

  // Total de filtros activos para mostrar en el badge del botón
  const totalSelected = selectedCats.size + selectedBrands.size;

  return (
    <div
      className="d-flex flex-wrap align-items-center gap-3 py-4 border-bottom"
      style={{ paddingLeft: "190px" }}
    >
      {/* FILTRO */}
      <div style={{ position: "relative" }}>
        {/* Botón trigger — abre y cierra el panel al hacer click */}
        <button
          ref={triggerRef}
          onClick={() => setOpen((o) => !o)}
          className="btn text-white d-flex align-items-center gap-2"
          style={{
            background: "#1e1e1e",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "7px 14px",
          }}
        >
          <i className="bi bi-filter" style={{ fontSize: 20 }}></i>
          Filtrar
          {/* Badge rojo con el número de filtros activos — solo aparece si hay alguno */}
          {totalSelected > 0 && (
            <span
              style={{
                background: "#e53935",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: "50%",
                width: 17,
                height: 17,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalSelected}
            </span>
          )}
          {/* Flecha que rota 180° cuando el panel está abierto */}
          <span
            style={{
              fontSize: 10,
              display: "inline-block",
              transition: "transform .2s",
              transform: open ? "rotate(180deg)" : "none",
            }}
          >
            ▼
          </span>
        </button>

        {/* Panel desplegable — se muestra/oculta con opacity y transform (no display:none para que la animación funcione) */}
        <div
          ref={panelRef}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            width: 260,
            background: "#1a1a1a",
            border: "1px solid #2e2e2e",
            borderRadius: 10,
            zIndex: 999,
            boxShadow: "0 10px 36px rgba(0,0,0,.55)",
            transition: "opacity .18s ease, transform .18s ease",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: open ? "all" : "none",
          }}
        >
          {/* Cabecera del panel con título y botón limpiar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "11px 14px",
              borderBottom: "1px solid #2a2a2a",
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
              Filtros
            </span>
            <button
              onClick={clearAll}
              style={{
                background: "none",
                border: "none",
                color: "#e53935",
                fontSize: 11,
                cursor: "pointer",
                padding: 0,
              }}
            >
              Limpiar todo
            </button>
          </div>

          {/* Sección de categorías */}
          <FilterSection
            title="Categoría"
            items={categories}
            selected={selectedCats}
            onToggle={(id) => toggleItem(setSelectedCats, id)}
            loading={catLoading}
            error={catError}
          />

          {/* Sección de marcas */}
          <FilterSection
            title="Marca"
            items={brands}
            selected={selectedBrands}
            onToggle={(id) => toggleItem(setSelectedBrands, id)}
            loading={brandLoading}
            error={brandError}
          />

          {/* Botón que confirma y aplica los filtros seleccionados */}
          <div style={{ padding: "10px 14px 14px" }}>
            <button
              onClick={applyFilters}
              style={{
                width: "100%",
                background: "#e53935",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "9px 0",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>

      {/* BUSCADOR */}
      <form
        className="d-flex mx-1"
        style={{ minWidth: "200px", maxWidth: "600px", flex: 1 }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
        />
        <button className="btn" type="submit">
          <i className="bi bi-search text-white"></i>
        </button>
      </form>

      {/* BOTON AGREGAR — solo se renderiza si showAddButton es true */}
      {showAddButton && <AddProductButton onClick={onAdd} />}
    </div>
  );
}
