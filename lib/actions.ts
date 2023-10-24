"use server";

import * as z from "zod";
import { supabaseServerAction } from "./supabaseServer";
import { createOperatorFormSchema } from "@/components/users/create-operator-dialog";
import { createAdministratorFormSchema } from "@/components/users/create-administrator-dialog";

export async function sendOperatorInvitation(
  values: z.infer<typeof createOperatorFormSchema>
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

export async function sendAdministratorInvitation(
  values: z.infer<typeof createAdministratorFormSchema>
) {
  const supabase = supabaseServerAction();

  const { error } = await supabase.auth.admin.inviteUserByEmail(values.email, {
    data: {
      fullname: values.fullname,
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
