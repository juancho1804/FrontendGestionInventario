import { useState, useRef } from "react";
import { useCategories } from "../hooks/useCategories";

export default function NavMenu({ items = [], onGenderChange,onCategorySelect, selectedGender }) {
  const { categories } = useCategories();
  const [openGender, setOpenGender] = useState(null);
  const closeTimer = useRef(null);

  const handleEnter = (gender) => {
    if (!gender) return;
    clearTimeout(closeTimer.current);
    setOpenGender(gender);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGender(null), 120);
  };

  return (
    <ul className="nav">
      {items.map((item, index) => {
        const categoriasDelGenero = item.gender
          ? categories.filter((c) => c.gender === item.gender)
          : [];

        return (
          <li
            key={index}
            className="nav-item-hover"
            onMouseEnter={() => handleEnter(item.gender)}
            onMouseLeave={handleLeave}
          >
            
            <a 
              className={`nav-link ${selectedGender === item.gender ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => onGenderChange?.(item.gender)}>
              {item.label}
            </a>

            {categoriasDelGenero.length > 0 && (
              <div
                className={`nav-dropdown ${openGender === item.gender ? "nav-dropdown-open" : ""}`}
              >
                <ul>
                  {categoriasDelGenero.map((cat) => (
                    <li key={cat.id}>
                      <a onClick={() => {
                        onCategorySelect?.(item.gender, cat.id);
                        setOpenGender(null);
                      }}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}