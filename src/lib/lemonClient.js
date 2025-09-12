import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

const lemon = new lemonSqueezy(process.env.LEMON_API_KEY)
    
export async function createCheckout() {
        const checkout = await.lemon.checkouts.createCheckout(process.env.STORE_ID,{
             variant_id:process.env.VARIANT_ID
             checkout_data: {
                email:'client@example.com',
             },
        })
        return checkout.data.attributes.url
     }