import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>VidSync</h1>
      </Link>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Ana Sayfa</Link>
        
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Hoş geldin, {user ? user.firstName + ' ' + user.middleName : ''}
            </span>
            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid white', color: 'white', cursor: 'pointer', padding: '0.5rem' }}>
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Giriş Yap</Link>
            <Link to="/register" style={{ color: 'white' }}>Kayıt Ol</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;