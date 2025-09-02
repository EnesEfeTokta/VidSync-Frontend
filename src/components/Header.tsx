import React  from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#333', color: 'white' }}>
      <h1>VidSync</h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Ana Sayfa</Link>
        <Link to="/login" style={{ color: 'white', marginRight: '1rem' }}>Giriş Yap</Link>
        <Link to="/register" style={{ color: 'white' }}>Kayıt Ol</Link>
      </nav>
    </header>
  );
};

export default Header;