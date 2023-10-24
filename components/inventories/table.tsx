"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { inventoriesColumnDef } from "./column-def";
import { useTableDefinition } from "@/lib/hooks/use-table-definition";
import { UpdateInventoryDialog } from "./update-dialog";
import InventoriesAditionalActions from "./aditional-actions";
import { PostgrestError } from "@supabase/supabase-js";
import useDeleteRecords from "@/lib/hooks/use-delete-records";

export function InventoriesTable({
  data,
  error,
}: {
  data: Tables<"Inventories">[] | null;
  error: PostgrestError | null;
}) {
  const deleteRecords = useDeleteRecords("Inventories");

  const { table, globalFilter, setGlobalFilter } = useTableDefinition<
    Tables<"Inventories">
  >({
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
      deleteRow: (row) => deleteRecords([row.original.id]),
      deleteSelectedRows: (rows) =>
        deleteRecords(rows.map((row) => row.original.id)),
    },
    error,
  });

  return (
    <DataTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
