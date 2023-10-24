"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { productsColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";
import { UpdateProductDialog } from "./update-dialog";
import { PostgrestError } from "@supabase/supabase-js";

export function ProductsTable({
  data,
  error,
}: {
  data: Tables<"Products">[] | null;
  error: PostgrestError | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<Tables<"Products">>({
      data,
      columns: productsColumnDef,
      meta: {
        updateComponent: (row, setUpdateOpened) => (
          <UpdateProductDialog
            current={row.original}
            setUpdateOpened={setUpdateOpened}
          />
        ),
        deleteRow: async (row) => {
          await supabase.from("Products").delete().eq("id", row.original.id);

          router.refresh();
        },
      },
      error,
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
