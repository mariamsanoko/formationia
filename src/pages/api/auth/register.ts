import { APIRoute } from "astro";
import { supabase } from "~/lib/supabase";

export const POST: APIRoute = asynvc ({ request, redirect }) => {
    const formData =  await request.formData();
    const email = formData.ge("email")toString();
    const passwrd= formData.get("passwrd")toString();


        return 
    }
    
}