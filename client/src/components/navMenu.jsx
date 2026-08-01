import { useState, useRef } from "react";
import {useNavigate, useLocation} from "react-router-dom"
import { useCategories } from "../hooks/useCategories";
import { ChevronDown } from "lucide-react";

export default function NavMenu({ 
  items = [],
  onGenderChange,
  onCategorySelect,
  selectedGender, 
  className = "",
  isMobile = false,
 }) {
  const { categories } = useCategories();
  const [openGender, setOpenGender] = useState(null);
  const closeTimer = useRef(null);
  const contentRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnter = (gender) => {
    if (isMobile||!gender) return;
    clearTimeout(closeTimer.current);
    setOpenGender(gender);
  };

  const handleLeave = () => {
    if(isMobile)return;
    closeTimer.current = setTimeout(() => setOpenGender(null), 120);
  };

  const handleLabelClick = (item, hasCategories) => {
    if(item.path){
      navigate(item.path);
      return;
    }
    if (isMobile && hasCategories) {
      setOpenGender((prev) => (prev === item.gender ? null : item.gender));
    } else {
      onGenderChange?.(item.gender);
    }
  };

  return (
    <ul className={`nav ${className}`}>
      {items.map((item, index) => {
        const categoriasDelGenero = item.gender
          ? categories.filter((c) => c.gender === item.gender)
          : [];
        const hasCategories = categoriasDelGenero.length>0;
        const isOpen = openGender === item.gender;
        const isActive = item.path? location.pathname === item.path : selectedGender === item.gender;

        return (
          <li
            key={index}
            className="nav-item-hover"
            onMouseEnter={() => handleEnter(item.gender)}
            onMouseLeave={handleLeave}
          >
            
            <a 
              className={`nav-link ${isActive ? "active" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleLabelClick(item,hasCategories)}>
              {item.label}
              {isMobile && hasCategories &&(
                <ChevronDown
                size={16}
                className={`nav-chevron ${isOpen ? "nav-chevron--open" : ""}`}
                />
              )}
            </a>

            {hasCategories && (
              <div
                className={`nav-dropdown ${isOpen ? "nav-dropdown-open" : ""} ${isMobile ? "nav-dropdown--mobile" : ""}`}
                style={
                  isMobile
                  ?{
                    maxHeight:isOpen
                    ? `${contentRefs.current[item.gender]?.scrollHeight ?? 0}px`
                    : "0px",
                  }
                  : undefined
                }
              >
                <ul ref={(el) =>(contentRefs.current[item.gender]=el)}>
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