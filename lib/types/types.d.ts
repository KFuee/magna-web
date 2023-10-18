import { Row, RowData } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    updateRow: (row: Row<TData>) => void;
    deleteRow: (row: Row<TData>) => void;
  }
}
