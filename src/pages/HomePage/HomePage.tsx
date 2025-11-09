import React from "react";
import { Link } from "react-router-dom";
import { Video, Shield, MessageCircle, UserPlus, Settings, Send, Star } from "lucide-react";
import "../../App.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero-section" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Welcome to VidSync</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-color)" }}>
          We bring together real-time video synchronization and chat experience.
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
            Sign Up Now
          </button>
        </Link>
      </section>

      <section className="features-section" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem" }}>Core Features</h2>
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
          <FeatureCard icon={<Video size={40} />} title="HD Video" desc="Experience crystal-clear video quality." />
          <FeatureCard icon={<Shield size={40} />} title="Security" desc="Your data is protected with modern security protocols." />
          <FeatureCard icon={<MessageCircle size={40} />} title="Instant Messaging" desc="Communicate instantly during sessions." />
          <FeatureCard icon={<UserPlus size={40} />} title="Easy Join" desc="Join instantly by sharing the link." />
        </div>
      </section>

      <section className="how-it-works" style={{ padding: "4rem 2rem", backgroundColor: "var(--header-footer-bg)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>How It Works</h2>
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
          <StepCard icon={<UserPlus size={40} />} title="Create Account" desc="Set up your VidSync account in seconds." />
          <StepCard icon={<Settings size={40} />} title="Configure Room" desc="Set up your camera, microphone, and room settings." />
          <StepCard icon={<Send size={40} />} title="Send Invites" desc="Share the link with friends and get started!" />
        </div>
      </section>

      <section className="reviews-section" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 style={{ marginBottom: "2rem" }}>User Reviews</h2>
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
          <ReviewCard name="Alex Y." text="Really amazing! Video quality and synchronization are perfect." />
          <ReviewCard name="Emma K." text="Very user-friendly, perfect for movie nights with friends." />
          <ReviewCard name="Mark A." text="Secure and fast. Dark mode looks great too!" />
        </div>
      </section>
    </div>
  );
};

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
