import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";
import "./Header.css";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`header ${theme === "dark" ? "dark" : "light"}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>VidSync</h1>
        </Link>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/faq" className="nav-link">
            FAQ
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>

          {isAuthenticated ? (
            <>
              <span className="user-greeting">
                Welcome, {user ? `${user.firstName} ${user.middleName}` : ""}
              </span>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </>
          )}

          <button className="btn theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
};

export default Header;