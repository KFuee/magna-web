import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types/database";

// TODO: Modificar en el futuro
export const supabaseServer = () => {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerComponentClient<Database>(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
};

export const supabaseServerAction = () => {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerActionClient(
    { cookies },
    {
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    }
  );
};
