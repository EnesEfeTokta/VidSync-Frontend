import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X } from "lucide-react"; // mobil menü ikonları
import "./Header.css"; // Stil dosyası

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
        {/* Logo */}
        <Link to="/" className="logo">
          <h1>VidSync</h1>
        </Link>

        {/* Desktop Menü */}
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
                Hoş geldin, {user ? `${user.firstName} ${user.middleName}` : ""}
              </span>
              <button className="btn" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Giriş Yap
              </Link>
              <Link to="/register" className="nav-link">
                Kayıt Ol
              </Link>
            </>
          )}

          {/* Tema Toggle */}
          <button className="btn theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Koyu Tema" : "☀️ Açık Tema"}
          </button>
        </nav>

        {/* Mobil Menü Butonu */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
