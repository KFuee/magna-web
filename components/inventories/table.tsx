"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { inventoriesColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";
import { UpdateInventoryDialog } from "./update-dialog";
import InventoriesAditionalActions from "./aditional-actions";
import { PostgrestError } from "@supabase/supabase-js";

export function InventoriesTable({
  data,
  error,
}: {
  data: Tables<"Inventories">[] | null;
  error: PostgrestError | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<Tables<"Inventories">>({
      data,
      columns: inventoriesColumnDef,
      meta: {
        aditionalActions: (row) => <InventoriesAditionalActions row={row} />,
        updateComponent: (row, setUpdateOpened) => (
          <UpdateInventoryDialog
            current={row.original}
            setUpdateOpened={setUpdateOpened}
          />
        ),
        deleteRow: async (row) => {
          await supabase.from("Inventories").delete().eq("id", row.original.id);

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
