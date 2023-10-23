"use server";

import { createUserFormSchema } from "@/components/users/create-dialog";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as z from "zod";
import { supabaseServerAction } from "./supabaseServer";

export async function sendInvitationLink(
  values: z.infer<typeof createUserFormSchema>
) {
  const supabase = supabaseServerAction();

  const { error } = await supabase.auth.admin.generateLink({
    type: "invite",
    email: values.email,
    options: {
      data: {
        fullname: values.fullname,
        sap_code: values.sap_code,
        position: values.position,
        organizational_unit: values.organizational_unit,
      },
    },
  });

  if (!error) {
    return;
  }

  throw error;
}

export async function deleteUser(id: string) {
  const supabase = supabaseServerAction();

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (!error) {
    return;
  }

  throw error;
}
