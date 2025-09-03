import React, { useState } from 'react';

export interface RegisterData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
}

// 2. Bileşenin alacağı propları tanımlayan arayüz
export interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  // 3. Formun durumunu yönetmek için useState kancası
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Input alanları değiştikçe state'i güncelleyen fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kayıt Ol</h2>
      <div>
        <label htmlFor="firstName">Adı:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="middleName">Orta Adı:</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Soyadı:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-posta:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Şifre:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

export default RegisterForm;