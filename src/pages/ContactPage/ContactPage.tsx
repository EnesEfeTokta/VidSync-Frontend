import React from 'react';
import './ContactPageStyles.css';
import "../../App.css";
import { FaUser, FaEnvelope, FaPen, FaQuestionCircle, FaMapMarkerAlt } from 'react-icons/fa';

const contactMethods = [
  {
    Icon: FaEnvelope,
    title: 'Email',
    content: <a href="mailto:support@vidsync.com">support@vidsync.com</a>,
    note: 'We usually respond within 24 hours.',
  },
  {
    Icon: FaQuestionCircle,
    title: 'Help Center',
    content: <a href="/faq">Visit our FAQ page.</a>,
    note: 'You can find your answer here.',
  },
  {
    Icon: FaMapMarkerAlt,
    title: 'Our Office',
    content: <p>VidSync Technology Inc.</p>,
    note: 'Technopark, Istanbul, Turkey',
  }
];

const formFields = [
  {
    id: 'name',
    label: 'USERNAME',
    type: 'text',
    placeholder: 'Your full name',
    Icon: FaUser,
  },
  {
    id: 'email',
    label: 'EMAIL',
    type: 'email',
    placeholder: 'example@mail.com',
    Icon: FaEnvelope,
  }
];

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page-container">
      <header className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear your questions, suggestions or feedback.</p>
      </header>

      <main className="contact-main-content">
        <aside className="contact-info-panel">
          <h3>Alternative Ways</h3>
          
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

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            {formFields.map(({ id, label, type, placeholder, Icon }) => (
              <div key={id} className="form-group">
                <label htmlFor={id}>{label}</label>
                <div className="input-wrapper">
                  <Icon className="input-icon" />
                  <input id={id} type={type} placeholder={placeholder} className="form-input" required />
                </div>
              </div>
            ))}
            
            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>
              <div className="input-wrapper">
                <FaPen className="input-icon textarea-icon" />
                <textarea 
                  id="message" 
                  placeholder="Write your thoughts here..." 
                  rows={5} 
                  className="form-input" 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
