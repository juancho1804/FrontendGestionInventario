export default function ImageGrid({ images, canAddMore, onRemove, onAdd, fileInputRef, onFileChange }) {
  const getGridColumns = (count) => {
    if (count <= 1) return "1fr";
    return "1fr 1fr";
  };

  return (
    <div className="col-md-5">
      <label className="form-label fw-semibold">
        Imágenes del producto
        <span className="text-muted fw-normal ms-2" style={{ fontSize: 12 }}>
          ({images.length}/4)
        </span>
      </label>

      <div style={{ display: "grid", gridTemplateColumns: getGridColumns(images.length + (canAddMore ? 1 : 0)), gap: 8, minHeight: 200 }}>
        {images.map((img, index) => (
          <div key={index} style={{ position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "1" }}>
            {index === 0 && (
              <span style={{ position: "absolute", top: 6, left: 6, background: "#e53935", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 20, zIndex: 2 }}>
                Principal
              </span>
            )}
            <img src={img.preview} alt={`imagen-${index}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              type="button"
              onClick={() => onRemove(index)}
              style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.55)", border: "none", color: "#fff", borderRadius: "50%", width: 24, height: 24, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}
            >
              ×
            </button>
          </div>
        ))}

        {canAddMore && (
          <div
            onClick={onAdd}
            style={{ aspectRatio: "1", border: "2px dashed #ccc", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 6, transition: "border-color .2s" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "#888"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "#ccc"}
          >
            <span style={{ fontSize: 36, color: "#aaa", lineHeight: 1 }}>+</span>
            <span style={{ fontSize: 12, color: "#aaa" }}>Añadir imagen</span>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" style={{ display: "none" }} accept="image/png, image/jpeg, image/heic" multiple onChange={onFileChange} />
    </div>
  );
}