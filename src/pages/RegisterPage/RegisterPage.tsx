// src/pages/RegisterPage.tsx

import React from "react";
import { Link } from "react-router-dom"; // Giriş sayfasına link vermek için
import RegisterForm from "../../components/RegisterForm";
import "../App.css";
import './LoginPageStyles.css'; // Ortak login/register stil dosyası

const RegisterPage: React.FC = () => {
  return (
    // Ana sayfa konteyneri
    <div className="login-page-container">
      
      {/* Tüm içeriği saran ve ortalayan kart */}
      <div className="login-card">

        {/* Sayfa başlığı */}
        <h1 className="login-title">Hesap Oluştur</h1>
        <p className="login-subtitle">Maceraya katılmak için sabırsızlanıyoruz!</p>

        {/* RegisterForm bileşenini buraya yerleştiriyoruz */}
        <RegisterForm />

        {/* İsteğe bağlı: Sosyal medya ile giriş alanı için ayırıcı */}
        <div className="separator">VEYA</div>

        {/* İsteğe bağlı: Sosyal medya butonları */}
        <div className="social-logins">
          <button className="social-login-btn">
            {/* <FaGoogle /> ikonu eklenebilir */}
            Google ile Devam Et
          </button>
          <button className="social-login-btn">
            {/* <FaGithub /> ikonu eklenebilir */}
            GitHub ile Devam Et
          </button>
        </div>

        {/* Giriş sayfasına yönlendirme linki */}
        <p className="signup-link">
          Zaten bir hesabın var mı?{' '}
          <Link to="/login">Giriş Yap</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;