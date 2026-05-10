import { Link } from "react-router-dom";
export default function Header({ tableNumber, className }) {
  return (
    <header className={className}>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <span className="headerBtn">
                <i className="bx bxs-home"></i>
              </span>
            </Link>
          </li>

          {tableNumber && <li>Table Number {tableNumber}</li>}
          <li>logo</li>
        </ul>
      </nav>
    </header>
  );
}
