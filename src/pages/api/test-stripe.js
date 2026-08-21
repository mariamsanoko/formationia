import { testStripeConnection } from '../../lib/stripeClient.js';

export async function GET() {
    const result = await testStripeConnection();

    return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}