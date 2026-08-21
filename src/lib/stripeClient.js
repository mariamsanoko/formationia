import Stripe from 'stripe';

const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("Attention : La variable STRIPE_SECRET_KEY est manquante dans l'environnement.");
}

export const stripeClient = new Stripe(stripeSecretKey || '');