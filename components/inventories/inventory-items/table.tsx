"use client";

import DataTable from "@/components/table/data-table";
import { inventoryItemsColumnDef } from "./column-def";
import { useTableDefinition } from "@/lib/hooks/use-table-definition";
import { UpdateInventoryDialog } from "./update-dialog";
import { InventoryItem } from "@/lib/types/inventory-item";
import { PostgrestError } from "@supabase/supabase-js";
import useDeleteRecords from "@/lib/hooks/use-delete-records";

export function InventoryItemsTable({
  data,
  error,
}: {
  data?: InventoryItem[] | null;
  error: PostgrestError | null;
}) {
  const deleteRecords = useDeleteRecords("InventoryItems");

  const { table, globalFilter, setGlobalFilter } =
    useTableDefinition<InventoryItem>({
      data,
      error,
      columns: inventoryItemsColumnDef,
      meta: {
        updateComponent: (row, setUpdateOpened) => (
          <UpdateInventoryDialog
            current={row.original}
            setUpdateOpened={setUpdateOpened}
          />
        ),
        deleteRow: (row) => deleteRecords([row.original.id]),
        deleteSelectedRows: (rows) =>
          deleteRecords(rows.map((row) => row.original.id)),
      },
    });

  return (
    <DataTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
