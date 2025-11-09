import React, { useState } from 'react';
import type { RegisterData } from '../types/RegisterData';
import { useAuth } from '../context/AuthContext';

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
      alert('Registration successful!');
      
      setFormData({
        firstName: '', middleName: '', lastName: '', email: '', password: ''
      });
    } catch (err) {
      console.error('Registration error:', err);
      
      setError('An error occurred during registration. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        
        <div className="form-group">
          <label htmlFor="firstName">ADINIZ</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form-input" 
            placeholder="Its name"
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
            className="form-input" 
            placeholder="Your last name"
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
            className="form-input" 
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
            className="form-input" 
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Recording' : 'Create Account'}
        </button>
      </form>
    </>
  );
};  

export default RegisterForm;