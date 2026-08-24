import Stripe from 'stripe';

const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("Attention : La variable STRIPE_SECRET_KEY est manquante dans l'environnement.");
}

// 1. Initialisation du client Stripe
export const stripeClient = new Stripe(stripeSecretKey || '', {
  httpClient: Stripe.createFetchHttpClient(),
});

// 2. Fonction de test indépendante
export const testStripeConnection = async () => {
  try {
    const balance = await stripeClient.balance.retrieve();
    return { success: true, balance };
  } catch (error) {
    console.error("Erreur de connexion Stripe :", error);
    return { success: false, error: error.message };
  }
};