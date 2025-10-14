import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import './Header.css'; // Stil dosyası

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext); // tema bilgisi
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>VidSync</h1>
      </Link>

      <nav className="nav">
        <Link to="/" className="nav-link">Ana Sayfa</Link>

        {isAuthenticated ? (
          <>
            <span className="user-greeting">
              Hoş geldin, {user ? user.firstName + ' ' + user.middleName : ''}
            </span>
            <button className="btn" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Giriş Yap</Link>
            <Link to="/register" className="nav-link">Kayıt Ol</Link>
          </>
        )}

        {/* Tema Toggle Butonu */}
        <button className="btn theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Koyu Tema" : "☀️ Açık Tema"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
