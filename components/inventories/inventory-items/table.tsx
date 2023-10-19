"use client";

import DataTable from "@/components/table/data-table";
import { inventoryItemsColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";
import { UpdateInventoryDialog } from "./update-dialog";
import { InventoryItem } from "@/lib/types/inventory-item";

export function InventoryItemsTable({ data }: { data: InventoryItem[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<InventoryItem>({
      data,
      columns: inventoryItemsColumnDef,
      meta: {
        updateComponent: (row, setUpdateOpened) => (
          <UpdateInventoryDialog
            current={row.original}
            setUpdateOpened={setUpdateOpened}
          />
        ),
        deleteRow: async (row) => {
          await supabase
            .from("InventoryItems")
            .delete()
            .eq("id", row.original.id);

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
