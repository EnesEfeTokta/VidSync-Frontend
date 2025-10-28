// src/components/RegisterForm.tsx

import React, { useState } from 'react';
import type { RegisterData } from '../types/RegisterData';
import { useAuth } from '../context/AuthContext';
// Stil dosyalarını buraya da eklemek, component'in kendi başına test edilmesini kolaylaştırır.
import '../pages/RegisterPage/RegisterPageStyles.css';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      await register(formData);
      alert('Kayıt başarılı!');
      // Formu sıfırlama
      setFormData({
        firstName: '', middleName: '', lastName: '', email: '', password: ''
      });
    } catch (err) {
      console.error('Registration error:', err);
      // Kullanıcıya daha anlamlı bir hata mesajı gösterilebilir.
      setError('Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hata mesajını formun üstünde, CSS'e uygun bir şekilde gösterelim */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        {/*
          Formu daha düzenli göstermek için alanları gruplayabiliriz.
          Örneğin, Ad ve Soyad yan yana olabilir. Şimdilik alt alta bırakalım.
        */}
        <div className="form-group">
          <label htmlFor="firstName">ADINIZ</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-input" // CSS sınıfı eklendi
            placeholder="Adınız"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">SOYADINIZ</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form-input" // CSS sınıfı eklendi
            placeholder="Soyadınız"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-POSTA</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input" // CSS sınıfı eklendi
            placeholder="ornek@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">ŞİFRE</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input" // CSS sınıfı eklendi
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Kaydediliyor...' : 'Hesap Oluştur'}
        </button>
      </form>
    </>
  );
};  

export default RegisterForm;