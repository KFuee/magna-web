"use client";

import { Row } from "@tanstack/react-table";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Tables } from "@/lib/types/database-custom";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";

export default function InventoriesAditionalActions({
  row,
}: {
  row: Row<Tables<"Inventories">>;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleInventoryStatus = async () => {
    const { error } = await supabase
      .from("Inventories")
      .update({
        closed_at: row.original.closed_at ? null : new Date().toISOString(),
      })
      .eq("id", row.original.id);

    if (error) {
      console.error(error);
    }

    router.refresh();
  };

  return (
    <>
      <DropdownMenuItem>
        <Link
          href={`/inventories/${encodeURIComponent(row.original.id)}`}
          className="w-full"
        >
          <span>Ver</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        className="w-full cursor-pointer"
        onClick={handleInventoryStatus}
      >
        <span>
          {row.original.closed_at ? "Abrir" : "Cerrar"}{" "}
          <span className="sr-only">inventario</span>
        </span>
      </DropdownMenuItem>
    </>
  );
}
