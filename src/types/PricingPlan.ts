export interface PricingPlan {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  buttonText: string;
  buttonType: 'primary' | 'secondary';
  isPopular?: boolean;
  features: string[];
}