// src/App.tsx
import { Routes, Route } from "react-router-dom";

// Bileşen (Component) importları
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatBot/ChatWidget"; // <-- 1. YENİ EKLENEN SATIR

// Sayfa (Page) importları
import Home from "./pages/HomePage/HomePage";
import About from "./pages/AboutPage/AboutPage";
import Pricing from "./pages/PricingPage/PricingPage";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import FAQ from "./pages/FAQPage/FAQPage";
import Contact from "./pages/ContactPage/ContactPage";
import RoomPage from './pages/RoomPage/RoomPage';
// ChatBotPage artık kullanılmıyor, bu yüzden importunu sildik.

// Context ve Global Stil importları
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

 
function App() {
  return (
    <ThemeProvider>
      <div
        className="app-container"
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            {/* Herkese Açık Rotalar */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Chatbot rotasını buradan kaldırdık */}

            {/* --- GELİŞTİRME AMACIYLA GEÇİCİ DEĞİŞİKLİK --- */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms/:roomId" element={<RoomPage />} />
            
          </Routes>
        </main>

        <Footer />

        {/* GEZGİN CHATBOT BİLEŞENİNİ BURAYA YERLEŞTİRİYORUZ */}
        <ChatWidget /> {/* <-- 2. YENİ EKLENEN SATIR */}
      </div>
    </ThemeProvider>
  );
}

export default App;