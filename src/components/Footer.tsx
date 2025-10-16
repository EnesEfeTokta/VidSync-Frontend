import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { connect } from "net";

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`footer ${theme === "dark" ? "dark" : "light"}`}>
      <div className="footer-container">
        <div className="footer-left">
          <p>&copy; 2025 VidSync. Tüm hakları saklıdır.</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Facebook size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
