import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './router/ProtectedRoute';
import RoomPage from './pages/RoomPage';
import { ThemeProvider } from './context/ThemeContext'; // 1️⃣ Context ekledik
import './App.css';
import './index.css';

function App() {
  return (
    <ThemeProvider> {/* 2️⃣ En üst seviye */}
      <div className="App">
        <Header />

        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/rooms/:roomId" element={<RoomPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
