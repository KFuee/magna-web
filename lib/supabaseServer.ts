import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types/database";

// TODO: Modificar en el futuro
const supabaseServer = () => {
  cookies().getAll(); // Keep cookies in the JS execution context for Next.js build
  return createServerComponentClient<Database>({ cookies });
};

export default supabaseServer;
