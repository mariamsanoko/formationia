import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export const getSupabaseClient = () => {
    if (!supabaseInstance) {
        const url = import.meta.env.SUPABASE_URL || '';
        const key = import.meta.env.SUPABASE_ANON_KEY || '';

        supabaseInstance = createClient(url, key, {
            auth: {
                flowType: "pkce",
                autoRefreshToken: false,
                detectSessionInUrl: false,
                persistSession: false, // Passé à 'false' car Cloudflare Workers ne gère pas le localStorage de base pour les sessions persistantes
            },
        });
    }
    return supabaseInstance;
};

export class supabase {
}