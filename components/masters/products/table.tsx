"use client";

import {
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Tables } from "@/lib/types/database-custom";
import { useState } from "react";
import DataTable from "@/components/data-table";
import { fuzzyFilter } from "@/lib/utils";
import { productsColumnDef } from "./column-def";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";

export function ProductsTable({ data }: { data: Tables<"Products">[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns: productsColumnDef,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    globalFilterFn: fuzzyFilter,
    meta: {
      updateRow: async (row: Row<Tables<"Products">>) => {},
      deleteRow: async (row: Row<Tables<"Products">>) => {
        const { error } = await supabase
          .from("Products")
          .delete()
          .eq("id", row.original.id);

        if (error) {
          console.error(error);
          return;
        }

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
