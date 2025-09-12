import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabaseClient";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData =  await request.formData();
    const email = formData.ge("email")toString();
    const passwrd= formData.get("passwrd")toString();


        return 
    }
    
}