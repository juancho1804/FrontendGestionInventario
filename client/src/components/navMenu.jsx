export default function NavMenu({ items = [] }) {
  return (
    <ul className="nav">
      {items.map((item, index) => (
        <li key={index}>
          <a className="nav-link">{item.label}</a>
        </li>
      ))}
    </ul>
  );
}