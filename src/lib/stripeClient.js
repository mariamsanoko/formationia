import Stripe from 'stripe';

let stripeInstance = null;

export const getStripeClient = () => {
  if (!stripeInstance) {
    const secretKey = import.meta.env.STRIPE_SECRET_KEY || '';

    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2023-08-16', // ou votre version actuelle
      typescript: true,
    });
  }
  return stripeInstance;
};