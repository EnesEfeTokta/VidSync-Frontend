import React from 'react';
import "../../App.css";
import './FAQPageStyles.css'; 
import type { HelpResource } from '../../types/HelpResource';
import { 
  FaBook, 
  FaWrench, 
  FaUsers, 
  FaBell, 
  FaFileInvoiceDollar} from 'react-icons/fa';

const helpResources: HelpResource[] = [
  {
    icon: FaBook,
    title: 'Documentation',
    description: 'Get help with using and managing applications.',
    linkText: 'View Documentation',
    linkHref: '/docs',
  },
  {
    icon: FaWrench,
    title: 'Knowledge Base',
    description: 'Find troubleshooting articles and guides.',
    linkText: 'Go to Knowledge Base',
    linkHref: '/knowledge-base',
  },
  {
    icon: FaUsers,
    title: 'Community',
    description: 'Get answers, support, and inspiration from other users.',
    linkText: 'Visit Community',
    linkHref: '/community',
  },
  {
    icon: FaBell,
    title: 'System Status',
    description: 'Check the health of our cloud applications and services.',
    linkText: 'View System Status',
    linkHref: '/status',
  },
  {
    icon: FaFileInvoiceDollar,
    title: 'Billing and Licensing',
    description: 'View FAQs about billing and licensing.',
    linkText: 'View FAQs',
    linkHref: '/billing-faq',
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="faq-page-container">
      
      <header className="faq-header">
        <h1>How Can We Help You?</h1>
        <p>You can find the help you need in the resources below.</p>
      </header>

      <main className="help-grid">
        {helpResources.map((resource) => (
          <div key={resource.title} className="help-card">
            <resource.icon className="help-icon" /> 
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
        <h2>Couldn't find what you're looking for?</h2>
        <a href="/contact" className="contact-button">Contact Us</a>
      </footer>
    </div>
  );
};

export default FAQPage;
  