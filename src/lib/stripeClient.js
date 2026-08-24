import Stripe from 'stripe';

let client = null;

// On crée une fonction qui retourne le client au lieu de l'exporter directement
export const getStripeClient = () => {
  if (!client) {
    const key = import.meta.env.STRIPE_SECRET_KEY || '';
    if (!key) {
      console.warn("Attention : La variable STRIPE_SECRET_KEY est manquante dans l'environnement.");
    }
    client = new Stripe(key, {
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return client;
};

// Fonction de test mise à jour
export const testStripeConnection = async () => {
  try {
    const stripe = getStripeClient();
    const balance = await stripe.balance.retrieve();
    return { success: true, balance };
  } catch (error) {
    console.error("Erreur de connexion Stripe :", error);
    return { success: false, error: error.message };
  }
};