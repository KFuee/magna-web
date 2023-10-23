"use server";

import { createUserFormSchema } from "@/components/users/create-dialog";
import * as z from "zod";
import { supabaseServerAction } from "./supabaseServer";

export async function sendInvitationLink(
  values: z.infer<typeof createUserFormSchema>
) {
  const supabase = supabaseServerAction();

  const { error } = await supabase.auth.admin.inviteUserByEmail(values.email, {
    data: {
      fullname: values.fullname,
      sap_code: values.sap_code,
      position: values.position,
      organizational_unit: values.organizational_unit,
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
