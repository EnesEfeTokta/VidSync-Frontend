// src/pages/PricingPage.tsx

import React from 'react';
import "../App.css";
import './PricingPageStyles.css'; // Sayfaya özel stilleri import ediyoruz
import { FaCheck } from 'react-icons/fa';

// Her bir fiyatlandırma planının yapısını tanımlayan bir arayüz (interface) oluşturalım.
interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  buttonText: string;
  buttonType: 'primary' | 'secondary'; // Butonun stilini belirler
  isPopular?: boolean; // Bu planın popüler olup olmadığını belirtir (isteğe bağlı)
  features: string[]; // Planın özelliklerini bir dizi olarak tutar
}

// Tüm fiyatlandırma planlarımızı tek bir veri dizisinde yönetelim.
const pricingPlans: PricingPlan[] = [
  {
    title: 'Temel',
    subtitle: 'Bireysel kullanıcılar için',
    price: 'Ücretsiz',
    period: '/ her zaman',
    buttonText: 'Ücretsiz Başla',
    buttonType: 'secondary',
    features: [
      'HD Video Kalitesi',
      '1 Toplantı Odası',
      'Temel E-posta Desteği',
      '5 GB Depolama',
    ],
  },
  {
    title: 'Pro',
    subtitle: 'Küçük ekipler ve profesyoneller için',
    price: '₺199',
    period: '/ay',
    buttonText: '14 Gün Ücretsiz Dene',
    buttonType: 'primary',
    isPopular: true, // Bu kartın "En Popüler" rozetini göstermesini sağlar
    features: [
      'Her şey sınırsız (HD Video)',
      'Sınırsız Toplantı Odası',
      'Öncelikli 7/24 Canlı Destek',
      '500 GB Depolama',
      'Gelişmiş Analitikler',
    ],
  },
  {
    title: 'Kurumsal',
    subtitle: 'Büyüyen organizasyonlar için',
    price: 'Teklif',
    period: 'Alın', // CSS'te boşluk olmaması için düzenlendi
    buttonText: 'Bizimle İletişime Geçin',
    buttonType: 'secondary',
    features: [
      'Tüm Pro özellikleri',
      'Özel API Erişimi',
      'Size Özel Müşteri Temsilcisi',
      'Sınırsız Depolama',
      'Gelişmiş Güvenlik (SSO)',
    ],
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page-container">
      {/* Başlık ve Açıklama Alanı */}
      <header className="pricing-header">
        <h2>İhtiyacınıza Uygun Planı Seçin</h2>
        <p>
          Tüm planlarımız güvenli, hızlı ve ölçeklenebilir altyapıya sahiptir.
          İstediğiniz zaman planınızı değiştirebilirsiniz.
        </p>
      </header>

      {/* Fiyatlandırma Kartları - Artık dinamik olarak oluşturuluyor */}
      <main className="pricing-cards-wrapper">
        {pricingPlans.map((plan) => (
          // Her plan için bir kart oluşturuyoruz. 'key' olarak benzersiz bir değer (plan.title) kullanıyoruz.
          <div 
            key={plan.title} 
            className={`pricing-card ${plan.isPopular ? 'popular-card' : ''}`}
          >
            {/* Eğer plan popülerse, rozeti göster (koşullu render) */}
            {plan.isPopular && <div className="popular-badge">En Popüler</div>}
            
            <div className="card-header">
              <h3>{plan.title}</h3>
              <span className="subtitle">{plan.subtitle}</span>
            </div>

            <div className="card-price">
              <span className="price-value">{plan.price}</span>
              <span className="price-period">{plan.period === 'Alın' ? '' : plan.period}</span>
            </div>

            <button className={`btn-pricing ${plan.buttonType}`}>
              {plan.buttonText}
            </button>

            <div className="card-features">
              <p className="features-label">ÖZELLİKLER:</p>
              <ul>
                {/* Her planın özellik listesini map ile dönerek li elemanları oluşturuyoruz */}
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck className="feature-icon" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default PricingPage;