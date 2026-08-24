export const prerender = false;

import { getStripeClient } from '~/lib/stripeClient.js';
// Importez votre client de base de données ici si besoin (ex: Prisma, Supabase, etc.)

export async function POST({ request }) {
    const stripeClient = getStripeClient();
    const signature = request.headers.get('stripe-signature');
    const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET; // À ajouter dans vos variables d'environnement (.env)

    let event;

    try {
        const body = await request.text();

        // Vérification de la signature pour s'assurer que la requête vient bien de Stripe
        event = stripeClient.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Erreur de signature Webhook : ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Traitement de l'événement
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const customerEmail = session.customer_details?.email;
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        console.log(`Paiement réussi pour : ${customerEmail}`);
        console.log(`ID Abonnement : ${subscriptionId}`);

        // TODO : Enregistrez l'abonnement en base de données ici
        // Ex: Mettre à jour l'utilisateur avec customerId et passer isSubscribed à true
    }

    return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}