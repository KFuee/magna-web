import { Row, RowData } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    deleteRow: (row: Row<TData>) => void;
  }
}
