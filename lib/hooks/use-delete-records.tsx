"use client";

import { useRouter } from "next/navigation";
import { Database } from "../types/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

export default function useDeleteRecords<
  T extends keyof Database["public"]["Tables"]
>(tableName: T) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();

  const deleteRecordsByIds = async (ids: string[]) => {
    const { error } = await supabase.from(tableName).delete().in("id", ids);

    if (error?.code === "23503") {
      toast({
        title: "Error",
        description:
          ids.length > 1
            ? `Uno de los registros seleccionados está en uso. Por favor, revise las dependencias.`
            : `El registro está en uso. Por favor, revise las dependencias.`,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    router.refresh();
  };

  return deleteRecordsByIds;
}
