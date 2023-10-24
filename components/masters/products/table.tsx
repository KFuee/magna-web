"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { productsColumnDef } from "./column-def";
import { useTableDefinition } from "@/lib/hooks/use-table-definition";
import { UpdateProductDialog } from "./update-dialog";
import { PostgrestError } from "@supabase/supabase-js";
import useDeleteRecords from "@/lib/hooks/use-delete-records";

export function ProductsTable({
  data,
  error,
}: {
  data: Tables<"Products">[] | null;
  error: PostgrestError | null;
}) {
  const deleteRecords = useDeleteRecords("Products");

  const { table, globalFilter, setGlobalFilter } = useTableDefinition<
    Tables<"Products">
  >({
    data,
    error,
    columns: productsColumnDef,
    meta: {
      updateComponent: (row, setUpdateOpened) => (
        <UpdateProductDialog
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
