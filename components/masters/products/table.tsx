"use client";

import {
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useCallback, useEffect, useState } from "react";
import DataTable from "@/components/data-table";
import { fuzzyFilter } from "@/lib/utils";
import { productsColumnDef } from "./column-def";

export function ProductsTable() {
  const supabase = createClientComponentClient<Database>();

  const [data, setData] = useState<Tables<"Products">[]>([]);
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
  });

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase.from("Products").select("*");

    if (error) {
      console.error(error);
    }

    setData(data ?? []);
  }, [supabase]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <DataTable
      table={table}
      rowSelection={rowSelection}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
