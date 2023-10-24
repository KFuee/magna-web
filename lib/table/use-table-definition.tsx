import { useEffect, useState } from "react";
import {
  SortingState,
  VisibilityState,
  RowSelectionState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  FilterFn,
  TableMeta,
} from "@tanstack/react-table";
import { fuzzyFilter } from "@/lib/utils";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

type TableOptions<TData> = {
  data?: TData[] | null;
  columns: ColumnDef<TData>[];
  globalFilterFn?: FilterFn<any>;
  meta: TableMeta<any>;
  error?: PostgrestError | AuthError | null;
};

export function useTableDefinition<TData>(options: TableOptions<TData>) {
  const { toast } = useToast();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: options.data || [],
    columns: options.columns,
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
    globalFilterFn: options.globalFilterFn || fuzzyFilter,
    meta: options.meta,
  });

  useEffect(() => {
    if (options.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: options.error.message,
        duration: 5000,
      });
    }
  }, [options.error, toast]); // Observa los cambios en options.error

  return {
    table,
    sorting,
    setSorting,
    globalFilter,
    setGlobalFilter,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
  };
}
