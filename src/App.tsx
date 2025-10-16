import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Pricing from "./pages/PricingPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import FAQ from "./pages/FAQPage";
import Contact from "./pages/ContactPage";
import RoomPage from './pages/RoomPage';
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <div
        className="app-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Üst Menü */}
        <Header />

        {/* Sayfa içeriği */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/rooms/:roomId" element={<RoomPage />} />
            </Route>
          </Routes>
        </main>

        {/* Alt Menü */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
