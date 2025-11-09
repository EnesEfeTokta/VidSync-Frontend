import React from 'react';
import './AboutPageStyles.css'; 
import "../../App.css"; 

const values = [
  {
    icon: '🔒',
    title: 'Security',
    description: 'All your data and communications are protected with end-to-end encryption.',
  },
  {
    icon: '⚡',
    title: 'Speed',
    description: 'Experience seamless communication with minimal latency thanks to our global server infrastructure.',
  },
  {
    icon: '🌍',
    title: 'Accessibility',
    description: 'Connect easily from any device - whether through web, desktop, or mobile application.',
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'A platform that continuously evolves with user feedback and regularly adds new features.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="about-page-container">
      <section className="about-hero">
        <h1>Our Mission: Reshaping Communication</h1>
        <p className="hero-subtitle">
          At <strong>VidSync</strong>, our purpose is to bring together people, teams, and communities by eliminating geographical boundaries.
          We enable you to create meaningful connections on a secure, fast, and innovative platform.
        </p>
      </section>

      <section className="about-values-section">
        <h2 className="section-title">Values That Define Us</h2>
        
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
