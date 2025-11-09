import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatBot/ChatBotWidget";
import Home from "./pages/HomePage/HomePage";
import About from "./pages/AboutPage/AboutPage";
import Pricing from "./pages/PricingPage/PricingPage";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import FAQ from "./pages/FAQPage/FAQPage";
import Contact from "./pages/ContactPage/ContactPage";
import RoomPage from './pages/RoomPage/RoomPage';
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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rooms/:roomId" element={<RoomPage />} />
            
          </Routes>
        </main>

        <Footer />

        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;