import { useState } from "react";
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

type TableOptions<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  globalFilterFn?: FilterFn<any>;
  meta: TableMeta<any>;
};

export function useTableDefinition<TData>(options: TableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: options.data,
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
