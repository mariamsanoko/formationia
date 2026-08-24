import type { APIRoute } from "astro";
import { getSupabaseClient } from "../../../lib/supabaseClient";

export const GET: APIRoute = async ({ request, redirect }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return new Response("Code d'authentification manquant.", { status: 400 });
    }

    // On initialise Supabase uniquement ici
    const supabase = getSupabaseClient();

    // On échange le code reçu par mail contre une session valide
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        return new Response(error.message, { status: 400 });
    }

    // Authentification réussie, direction le tableau de bord
    return redirect("/dashboard");
};