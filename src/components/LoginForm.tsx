import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginData } from '../types/LoginData';
import "../App.css";

interface LoginFormProps {
  redirectTo: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo }) => {
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
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      setError('The email or password is incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-card">
      <svg className="logo" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#5865F2" strokeWidth="2" strokeLinejoin="round"/>
         <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="#5865F2" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
      <h1 className="login-title">VidSync'e Giriş Yap</h1>
      <p className="login-subtitle">Devam etmek için oturum açın</p>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-POSTA</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="form-input"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            name="password"
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
          <a href="/forgot-password">I forgot my password</a>
        </div>
        
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="separator"></div>

      <p className="signup-link">
        Hesabınız yok mu? <Link to="/register">Bir hesap oluşturun</Link>
      </p>
    </div>
  );
};

export default LoginForm;