import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav className="bg-secondary py-3">
        <ul className="list-unstyled d-flex gap-4 container-fluid">
          <li>
            <Link className="text-white text-decoration-none" to="/patrimoine">
              Patrimoine
            </Link>
          </li>
          <li>
            <Link className="text-white text-decoration-none" to="/possession">
              Possessions
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
