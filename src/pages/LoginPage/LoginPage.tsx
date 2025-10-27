// src/pages/LoginPage.tsx

import React from "react";
import { useLocation, Link } from "react-router-dom"; // Sayfalar arası geçiş için Link eklendi
import LoginForm from "../../components/LoginForm"; // Bu component'in var olduğunu varsayıyoruz
import "../App.css";
import './LoginPageStyles.css'; // Sayfaya özel stilleri import ediyoruz

const LoginPage: React.FC = () => {
  const location = useLocation();

  // URL'nin "/register" içerip içermediğini kontrol ederek hangi sayfada olduğumuzu anlıyoruz
  const isRegisterPage = location.pathname.includes('/register');

  // Sayfanın dinamik içeriğini bir nesnede tutalım
  const pageContent = {
    title: isRegisterPage ? "Hesap Oluştur" : "Tekrar Hoş Geldin!",
    subtitle: isRegisterPage ? "Maceraya katılmak için sabırsızlanıyoruz!" : "Seni tekrar gördüğümüze sevindik!",
    formType: isRegisterPage ? "register" : "login",
    redirect: {
      text: isRegisterPage ? "Zaten bir hesabın var mı? " : "Hesabın yok mu? ",
      linkText: isRegisterPage ? "Giriş Yap" : "Kayıt Ol",
      to: isRegisterPage ? "/login" : "/register",
    }
  };

  // Giriş sonrası yönlendirme için state'i alıyoruz
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  return (
    <div className="login-page-container">
      
      {/* CSS'e uygun olarak tüm içeriği saran ana kart */}
      <div className="login-card">

        {/* Logo için bir alan (isteğe bağlı) */}
        {/* 
        <div className="logo">
          <img src="/logo.svg" alt="VidSync Logo" />
        </div> 
        */}

        {/* Dinamik Başlık ve Alt Başlık */}
        <h1 className="login-title">{pageContent.title}</h1>
        <p className="login-subtitle">{pageContent.subtitle}</p>

        {/* 
          LoginForm component'ine hangi form tipinde olduğunu (login/register) 
          ve başarılı işlem sonrası nereye yönlendireceğini prop olarak iletiyoruz.
        */}
        <LoginForm {...({ formType: pageContent.formType, redirectTo } as unknown as React.ComponentProps<typeof LoginForm>)} />

        {/* Giriş ve Kayıt sayfaları arasında geçişi sağlayan link */}
        <p className="signup-link">
          {pageContent.redirect.text}
          <Link to={pageContent.redirect.to}>
            {pageContent.redirect.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;