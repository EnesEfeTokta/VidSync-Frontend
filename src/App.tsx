import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './router/ProtectedRoute';
import RoomPage from './pages/RoomPage';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header her zaman görünür */}
      <Header />

      <main style={{ padding: '2rem' }}>
        {/* Routes, URL'ye göre hangi Route'un gösterileceğini belirler */}
        <Routes>
          {/* path="/" -> HomePage bileşenini göster */}
          <Route path="/" element={<HomePage />} />
          
          {/* path="/login" -> LoginPage bileşenini göster */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* path="/register" -> RegisterPage bileşenini göster */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Sadece giriş yapmış kullanıcıların erişebileceği özel yollar */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Diğer korunacak sayfalar (örn: /profile) buraya eklenebilir */}
          </Route>

          {/* Dinamik parametre içeren rota */}
          <Route path="/rooms/:roomId" element={<RoomPage />} />
        </Routes>
      </main>

      {/* Footer her zaman görünür */}
      <Footer />
    </div>
  );
}

export default App;