// export const prerender = false;

// 1. On importe la fonction d'initialisation différée
import { getStripeClient } from '~/lib/stripeClient.js';

export async function POST({ request }) {
    try {
        // 2. On instancie Stripe uniquement quand la route est appelée
        const stripeClient = getStripeClient();

        const data = await request.json();
        const priceId = data.priceId;
        const mode = data.mode || 'payment';

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
        console.error('Stripe checkout error:', error);

        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}