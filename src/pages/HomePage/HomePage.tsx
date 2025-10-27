import React from "react";
import { Link } from "react-router-dom";
import { Video, Shield, MessageCircle, UserPlus, Settings, Send, Star } from "lucide-react";
import "../App.css"; // mevcut renk değişkenleri ve temalar için

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      {/* --- HERO SECTION --- */}
      <section className="hero-section" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>VidSync'e Hoş Geldiniz</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>
          Gerçek zamanlı video senkronizasyonu ve sohbet deneyimini bir araya getiriyoruz.
        </p>
        <Link to="/signup">
          <button
            style={{
              marginTop: "2rem",
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Şimdi Kaydol
          </button>
        </Link>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem" }}>Temel Özellikler</h2>
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <FeatureCard icon={<Video size={40} />} title="HD Video" desc="Kristal netliğinde video deneyimi yaşayın." />
          <FeatureCard icon={<Shield size={40} />} title="Güvenlik" desc="Verileriniz modern güvenlik protokolleriyle korunur." />
          <FeatureCard icon={<MessageCircle size={40} />} title="Anlık Mesajlaşma" desc="Görüşme sırasında anında iletişim kurun." />
          <FeatureCard icon={<UserPlus size={40} />} title="Kolay Katılım" desc="Bağlantı göndererek hemen katılın." />
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="how-it-works" style={{ padding: "4rem 2rem", backgroundColor: "var(--header-footer-bg)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Nasıl Çalışır?</h2>
        <div
          className="steps"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          <StepCard icon={<UserPlus size={40} />} title="Hesap Oluştur" desc="VidSync hesabınızı birkaç saniyede oluşturun." />
          <StepCard icon={<Settings size={40} />} title="Oda Ayarlarını Yap" desc="Kameranızı, mikrofonunuzu ve odanızı ayarlayın." />
          <StepCard icon={<Send size={40} />} title="Davet Gönder" desc="Bağlantıyı arkadaşlarınızla paylaşın ve başlayın!" />
        </div>
      </section>

      {/* --- USER REVIEWS SECTION --- */}
      <section className="reviews-section" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem" }}>Kullanıcı Yorumları</h2>
        <div
          className="reviews-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <ReviewCard name="Ahmet Y." text="Gerçekten harika! Görüntü kalitesi ve senkronizasyon mükemmel." />
          <ReviewCard name="Elif K." text="Kullanımı çok kolay, arkadaşlarımla film geceleri için birebir." />
          <ReviewCard name="Mert A." text="Güvenli ve hızlı. Koyu mod da harika görünüyor!" />
        </div>
      </section>
    </div>
  );
};

// --- Yardımcı alt bileşenler ---
const FeatureCard = ({ icon, title, desc }: any) => (
  <div
    className="feature-card"
    style={{
      backgroundColor: "var(--card-bg, #222)",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      transition: "transform 0.3s",
    }}
  >
    <div style={{ color: "var(--primary-color)" }}>{icon}</div>
    <h3 style={{ marginTop: "1rem" }}>{title}</h3>
    <p style={{ fontSize: "0.9rem", color: "var(--text-color)" }}>{desc}</p>
  </div>
);

const StepCard = ({ icon, title, desc }: any) => (
  <div style={{ maxWidth: "280px" }}>
    <div style={{ color: "var(--primary-color)" }}>{icon}</div>
    <h3 style={{ marginTop: "1rem" }}>{title}</h3>
    <p style={{ fontSize: "0.9rem", color: "var(--text-color)" }}>{desc}</p>
  </div>
);

const ReviewCard = ({ name, text }: any) => (
  <div
    style={{
      backgroundColor: "var(--header-footer-bg)",
      padding: "1.5rem",
      borderRadius: "12px",
      textAlign: "left",
    }}
  >
    <p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>"{text}"</p>
    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.3rem" }}>
      <Star size={16} color="gold" /> {name}
    </p>
  </div>
);

export default HomePage;
