export default function NavMenu({ items = [], onGenderChange, selectedGender }) {
  return (
    <ul className="nav">
      {items.map((item, index) => (
        <li key={index}>
          <a
            className={`nav-link ${selectedGender === item.gender ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => onGenderChange?.(item.gender)}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}