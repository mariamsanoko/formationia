export const prerender = false;

import { stripeClient } from '~/lib/stripeClient.js';

export async function GET({ redirect }) {
    return redirect('/pricing', 302);
}

export async function POST({ request }) {
    try {
        const data = await request.json();
        const priceId = data.priceId;
        const mode = data.mode || 'payment';

        console.log('--- DEBUG STRIPE ---');
        console.log('Price ID reçu :', priceId);
        console.log('Mode reçu :', mode);
        console.log('Clé Stripe présente :', !!import.meta.env.STRIPE_SECRET_KEY);

        if (!priceId) {
            return new Response(JSON.stringify({ error: 'Le champ priceId est requis.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const origin = request.headers.get('origin') || import.meta.env.SITE || 'http://localhost:4321';

        const session = await stripeClient.checkout.sessions.create({
            mode: mode,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pricing`,
        });

        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Affiche l'erreur Stripe complète et brute dans votre terminal
        console.error('=== ERREUR STRIPE EXACTE ===');
        console.error(error);
        console.error('===========================');

        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}