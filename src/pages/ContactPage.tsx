// src/pages/ContactPage.tsx

import React from 'react';
// Sayfaya özel ve genel stil dosyalarını içe aktaralım
import './ContactPageStyles.css';
import "../App.css";
import { FaUser, FaEnvelope, FaPen, FaQuestionCircle, FaMapMarkerAlt } from 'react-icons/fa';

// --- Veri Odaklı Yapı ---

// İletişim metotlarını bir diziye taşıyalım
const contactMethods = [
  {
    Icon: FaEnvelope,
    title: 'E-posta',
    content: <a href="mailto:destek@vidsync.com">destek@vidsync.com</a>,
    note: 'Genellikle 24 saat içinde yanıtlarız.',
  },
  {
    Icon: FaQuestionCircle,
    title: 'Yardım Merkezi',
    content: <a href="/faq">Sıkça Sorulan Sorular sayfamızı ziyaret edin.</a>,
    note: 'Aradığınız cevabı burada bulabilirsiniz.',
  },
  {
    Icon: FaMapMarkerAlt,
    title: 'Ofisimiz',
    content: <p>VidSync Teknoloji A.Ş.</p>,
    note: 'Teknopark, İstanbul, Türkiye',
  }
];

// Form alanları için bir yapı oluşturalım (textarea hariç)
const formFields = [
  {
    id: 'name',
    label: 'KULLANICI ADI',
    type: 'text',
    placeholder: 'Adınız ve soyadınız',
    Icon: FaUser,
  },
  {
    id: 'email',
    label: 'E-POSTA',
    type: 'email',
    placeholder: 'ornek@mail.com',
    Icon: FaEnvelope,
  }
];

// --- Component ---

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page-container">
      {/* Sayfa başlığı için <header> semantik olarak daha uygundur */}
      <header className="contact-hero">
        <h1>İletişime Geçin</h1>
        <p>Sorularınızı, önerilerinizi veya geri bildirimlerinizi duymaktan mutluluk duyarız.</p>
      </header>

      <main className="contact-main-content">

        {/* --- SOL SÜTUN: İLETİŞİM BİLGİLERİ (aside elementi daha anlamlı) --- */}
        <aside className="contact-info-panel">
          <h3>Alternatif Yollar</h3>
          
          {/* İletişim metotlarını diziden map ile render edelim */}
          {contactMethods.map(({ Icon, title, content, note }) => (
            <div key={title} className="contact-method">
              <Icon className="contact-method-icon" />
              <div>
                <h4>{title}</h4>
                {content}
                <p className="note">{note}</p>
              </div>
            </div>
          ))}
        </aside>

        {/* --- SAĞ SÜTUN: İLETİŞİM FORMU --- */}
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            
            {/* Form alanlarını diziden map ile render edelim */}
            {formFields.map(({ id, label, type, placeholder, Icon }) => (
              <div key={id} className="form-group">
                <label htmlFor={id}>{label}</label>
                <div className="input-wrapper">
                  <Icon className="input-icon" />
                  <input id={id} type={type} placeholder={placeholder} className="form-input" required />
                </div>
              </div>
            ))}
            
            {/* Textarea, yapısı biraz farklı olduğu için ayrı yönetilebilir */}
            <div className="form-group">
              <label htmlFor="message">MESAJINIZ</label>
              <div className="input-wrapper">
                <FaPen className="input-icon textarea-icon" />
                <textarea 
                  id="message" 
                  placeholder="Aklınızdan geçenleri buraya yazın..." 
                  rows={5} 
                  className="form-input" 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="submit-button">
              Mesajı Gönder
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;