import type { APIRoute } from "astro";
import { getSupabaseClient } from "../../../lib/supabaseClient";

export const POST: APIRoute = async ({ request, redirect }) => {
  // On initialise Supabase au bon moment
  const supabase = getSupabaseClient();

  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return new Response("Email et mot de passe requis.", { status: 400 });
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return redirect("/dashboard");
};