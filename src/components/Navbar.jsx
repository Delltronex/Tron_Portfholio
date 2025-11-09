import { NavLink } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`nav ${menuOpen ? "open" : ""}`}>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className="nav-links">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
          Projects
        </NavLink>
        <NavLink to="/skills" onClick={() => setMenuOpen(false)}>
          Skills
        </NavLink>
        <NavLink to="/education" onClick={() => setMenuOpen(false)}>
          Education
        </NavLink>
        <NavLink to="/experience" onClick={() => setMenuOpen(false)}>
          Experience
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
