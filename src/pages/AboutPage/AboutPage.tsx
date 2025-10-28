// src/pages/AboutPage.tsx

import React from 'react';
// Stil dosyaları - Projenizin yapısına göre AboutPageStyles.css dosyasını da içermelidir.
import './AboutPageStyles.css'; 
import "../../App.css"; 

// Değerler dizisi, bileşen dışında tanımlanarak her render'da yeniden oluşturulması engellenir.
const values = [
  {
    icon: '🔒',
    title: 'Güvenlik',
    description: 'Tüm verileriniz ve görüşmeleriniz uçtan uca şifreleme ile koruma altındadır.',
  },
  {
    icon: '⚡',
    title: 'Hız',
    description: 'Global sunucu altyapımız sayesinde en düşük gecikmeyle kesintisiz iletişim sağlayın.',
  },
  {
    icon: '🌍',
    title: 'Erişilebilirlik',
    description: 'İster webden, ister masaüstü ya da mobil uygulamadan, her cihazdan kolayca bağlanın.',
  },
  {
    icon: '💡',
    title: 'Yenilik',
    description: 'Kullanıcı geri bildirimleriyle sürekli gelişen ve yeni özellikler eklenen bir platform.',
  },
];

const AboutPage: React.FC = () => {
  return (
    // Ana konteyner, sayfanın genel arkaplanını ve dolgusunu ayarlar.
    <div className="about-page-container">
      
      {/* 1. BÖLÜM: ETKİLİ KARŞILAMA ALANI (HERO) */}
      {/* 'about-hero' sınıfı metinleri ortalamak için yeterlidir, ekstra bir <div>'e gerek yoktur. */}
      <section className="about-hero">
        <h1>Misyonumuz: İletişimi Yeniden Şekillendirmek</h1>
        <p className="hero-subtitle">
          <strong>VidSync</strong> olarak amacımız, coğrafi sınırları ortadan kaldırarak insanları, ekipleri ve toplulukları
          bir araya getirmektir. Güvenli, hızlı ve yenilikçi bir platformda anlamlı bağlantılar kurmanızı sağlıyoruz.
        </p>
      </section>

      {/* 2. BÖLÜM: DEĞERLERİMİZ (KARTLI YAPI) */}
      <section className="about-values-section">
        <h2 className="section-title">Bizi Biz Yapan Değerler</h2>
        
        {/* 'values-grid' sınıfı, kartları duyarlı bir ızgara düzeninde sıralar. */}
        <div className="values-grid">
          {values.map((value, index) => (
            // 'value-card' her bir değeri temsil eden karttır.
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