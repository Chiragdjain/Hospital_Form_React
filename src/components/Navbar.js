import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";



const Navbar = () => {
  return (
    <nav>
      <div className="nav">
        <ul>
          <li>
            <Link to="/">City Hospital</Link>
          </li>
          <li>
            <Link to="/">HOME</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
