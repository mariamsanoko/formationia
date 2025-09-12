import { Lemonsqueezy } from '@lemonsqueezy/lemonsqueezy.js'

const lemon = new Lemonsqueezy(process.env.LEMON_API_KEY)

export async function createCheckout() {
  const checkout = await lemon.checkouts.createCheckout(process.env.STORE_ID, {
    variant_id: process.env.VARIANT_ID, // ID de ta formation
    checkout_data: {
      email: 'client@example.com',
    },
  })
  return checkout.data.attributes.url
}
