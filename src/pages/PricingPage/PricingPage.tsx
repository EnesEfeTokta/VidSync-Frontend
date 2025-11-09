import React from 'react';
import "../../App.css";
import './PricingPageStyles.css';
import { FaCheck } from 'react-icons/fa';
import type { PricingPlan } from '../../types/PricingPlan';

const pricingPlans: PricingPlan[] = [
  {
    title: 'Basic',
    subtitle: 'For individual users',
    price: 'Free',
    period: '/ forever',
    buttonText: 'Get Started for Free',
    buttonType: 'secondary',
    features: [
      'HD Video Quality',
      '1 Meeting Room',
      'Basic Email Support',
      '5 GB Storage',
    ],
  },
  {
    title: 'Pro',
    subtitle: 'For small teams and professionals',
    price: '$19',
    period: '/month',
    buttonText: 'Start 14-Day Free Trial',
    buttonType: 'primary',
    isPopular: true,
    features: [
      'Unlimited HD Video',
      'Unlimited Meeting Rooms',
      'Priority 24/7 Live Support',
      '500 GB Storage',
      'Advanced Analytics',
    ],
  },
  {
    title: 'Enterprise',
    subtitle: 'For growing organizations',
    price: 'Custom',
    period: 'Quote',
    buttonText: 'Contact Us',
    buttonType: 'secondary',
    features: [
      'All Pro features',
      'Custom API Access',
      'Dedicated Account Manager',
      'Unlimited Storage',
      'Advanced Security (SSO)',
    ],
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page-container">
      <header className="pricing-header">
        <h2>Choose the Plan That's Right for You</h2>
        <p>
          All our plans feature a secure, fast, and scalable infrastructure.
          You can change your plan at any time.
        </p>
      </header>

      <main className="pricing-cards-wrapper">
        {pricingPlans.map((plan) => (
          <div 
            key={plan.title} 
            className={`pricing-card ${plan.isPopular ? 'popular-card' : ''}`}
          >
            {plan.isPopular && <div className="popular-badge">Most Popular</div>}
            
            <div className="card-header">
              <h3>{plan.title}</h3>
              <span className="subtitle">{plan.subtitle}</span>
            </div>

            <div className="card-price">
              <span className="price-value">{plan.price}</span>
              <span className="price-period">{plan.period === 'Quote' ? '' : plan.period}</span>
            </div>

            <button className={`btn-pricing ${plan.buttonType}`}>
              {plan.buttonText}
            </button>

            <div className="card-features">
              <p className="features-label">FEATURES:</p>
              <ul>
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