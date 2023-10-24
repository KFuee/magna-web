"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { locationsColumnDef } from "./column-def";
import { useTableDefinition } from "@/lib/hooks/use-table-definition";
import { UpdateLocationDialog } from "./update-dialog";
import { PostgrestError } from "@supabase/supabase-js";
import useDeleteRecords from "@/lib/hooks/use-delete-records";

export function LocationsTable({
  data,
  error,
}: {
  data: Tables<"Locations">[] | null;
  error: PostgrestError | null;
}) {
  const deleteRecords = useDeleteRecords("Locations");

  const { table, globalFilter, setGlobalFilter } = useTableDefinition<
    Tables<"Locations">
  >({
    data,
    error,
    columns: locationsColumnDef,
    meta: {
      updateComponent: (row, setUpdateOpened) => (
        <UpdateLocationDialog
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
