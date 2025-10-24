// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginData } from '../types/LoginData';
import { FaGoogle, FaMicrosoft, FaApple, FaSlack } from 'react-icons/fa';
import "../App.css"; // Ana stil dosyamızı import ediyoruz

interface LoginFormProps {
  redirectTo: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo }) => {
  // Mevcut iş mantığınız burada korunuyor
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData);
      // Başarılı girişte alert yerine direkt yönlendirme daha iyi bir kullanıcı deneyimi sunar.
      // alert('Login successful!'); 
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      // Hata mesajını daha spesifik hale getirebilirsiniz.
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Yeni, modern JSX yapımız
    <div className="login-card">
      <svg className="logo" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#5865F2" strokeWidth="2" strokeLinejoin="round"/>
         <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="#5865F2" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <h1 className="login-title">VidSync'e Giriş Yap</h1>
      <p className="login-subtitle">Devam etmek için oturum açın</p>
      
      {/* Hata mesajı, formun üstünde daha belirgin bir şekilde gösterilir */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-POSTA</label>
          <input
            id="email"
            type="email"
            name="email" // name özelliği handleChange için önemli
            value={formData.email}
            onChange={handleChange}
            placeholder="E-posta adresinizi girin"
            className="form-input"
            required
            disabled={isLoading} // Yükleme sırasında input'ları devre dışı bırak
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">ŞİFRE</label>
          <input
            id="password"
            type="password"
            name="password" // name özelliği handleChange için önemli
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifrenizi girin"
            className="form-input"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" disabled={isLoading} />
            <span>Beni hatırla</span>
          </label>
          <a href="/forgot-password">Şifremi unuttum</a>
        </div>
        
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>

      <div className="separator"></div>

      <div className="social-logins">
        <button type="button" className="social-login-btn" disabled={isLoading}><FaGoogle /> Google ile devam et</button>
        <button type="button" className="social-login-btn" disabled={isLoading}><FaMicrosoft /> Microsoft ile devam et</button>
        <button type="button" className="social-login-btn" disabled={isLoading}><FaApple /> Apple ile devam et</button>
        <button type="button" className="social-login-btn" disabled={isLoading}><FaSlack /> Slack ile devam et</button>
      </div>

      <p className="signup-link">
        Hesabınız yok mu? <Link to="/register">Bir hesap oluşturun</Link>
      </p>
    </div>
  );
};

export default LoginForm;