"use client";

import { Row } from "@tanstack/react-table";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/data-table";
import { productsColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";

export function ProductsTable({ data }: { data: Tables<"Products">[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<Tables<"Products">>({
      data,
      columns: productsColumnDef,
      meta: {
        updateRow: async (row: Row<Tables<"Products">>) => {
          await supabase
            .from("Products")
            .update({
              code: row.original.code,
              description: row.original.description,
            })
            .eq("id", row.original.id);

          router.refresh();
        },
        deleteRow: async (row: Row<Tables<"Products">>) => {
          await supabase.from("Products").delete().eq("id", row.original.id);

          router.refresh();
        },
      },
    });

  return (
    <DataTable
      table={table}
      rowSelection={rowSelection}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
