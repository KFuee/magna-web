"use client";

import { Tables } from "@/lib/types/database-custom";
import DataTable from "@/components/table/data-table";
import { locationsColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";
import { UpdateLocationDialog } from "./update-dialog";
import { PostgrestError } from "@supabase/supabase-js";

export function LocationsTable({
  data,
  error,
}: {
  data: Tables<"Locations">[] | null;
  error: PostgrestError | null;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<Tables<"Locations">>({
      data,
      columns: locationsColumnDef,
      meta: {
        updateComponent: (row, setUpdateOpened) => (
          <UpdateLocationDialog
            current={row.original}
            setUpdateOpened={setUpdateOpened}
          />
        ),
        deleteRow: async (row) => {
          await supabase.from("Locations").delete().eq("id", row.original.id);

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
