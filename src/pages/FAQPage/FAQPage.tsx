// src/pages/FAQPage.tsx

import React from 'react';
import "../App.css";
import './FAQPageStyles.css'; // Sayfaya özel stiller
import { 
  FaBook, 
  FaWrench, 
  FaUsers, 
  FaBell, 
  FaFileInvoiceDollar} from 'react-icons/fa';

interface HelpResource {
  icon: React.ElementType; 
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const helpResources: HelpResource[] = [
  {
    icon: FaBook,
    title: 'Dokümantasyon',
    description: 'Uygulamaları kullanma ve yönetme konusunda yardım alın.',
    linkText: 'Dokümantasyonu Görüntüle',
    linkHref: '/docs',
  },
  {
    icon: FaWrench,
    title: 'Bilgi Bankası',
    description: 'Sorun giderme makalelerini ve kılavuzları bulun.',
    linkText: 'Bilgi Bankasına Git',
    linkHref: '/knowledge-base',
  },
  {
    icon: FaUsers,
    title: 'Topluluk',
    description: 'Diğer kullanıcılardan cevaplar, destek ve ilham alın.',
    linkText: 'Topluluğu Ziyaret Et',
    linkHref: '/community',
  },
  {
    icon: FaBell,
    title: 'Sistem Durumu',
    description: 'Bulut uygulamalarımızın ve servislerimizin sağlığını kontrol edin.',
    linkText: 'Sistem Durumunu Görüntüle',
    linkHref: '/status',
  },
  {
    icon: FaFileInvoiceDollar,
    title: 'Fatura ve Lisanslama',
    description: 'Faturalama ve lisanslama hakkında SSS\'leri görün.',
    linkText: 'SSS\'leri Görüntüle',
    linkHref: '/billing-faq',
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="faq-page-container">
      
      <header className="faq-header">
        <h1>Size Nasıl Yardımcı Olabiliriz?</h1>
        <p>Aradığınız yardımı aşağıdaki kaynaklarda bulabilirsiniz.</p>
      </header>

      <main className="help-grid">
        {helpResources.map((resource) => (
          <div key={resource.title} className="help-card">
            <resource.icon className="help-icon" />
            {/* CSS'in flexbox düzenini doğru uygulaması için bu sarmalayıcı div eklendi */}
            <div className="help-card-content">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.linkHref} className="help-link">
                {resource.linkText}
              </a>
            </div>
          </div>
        ))}
      </main>

      <footer className="faq-footer">
        <h2>Aradığınız yardımı bulamadınız mı?</h2>
        <a href="/contact" className="contact-button">Bizimle İletişime Geçin</a>
      </footer>
    </div>
  );
};

export default FAQPage;