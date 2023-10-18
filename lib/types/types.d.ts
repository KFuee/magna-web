import { Row, RowData } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  export interface TableMeta<TData extends RowData> {
    updateComponent: (
      row: Row<TData>,
      setUpdateOpened: (value: boolean) => void
    ) => void;
    deleteRow: (row: Row<TData>) => void;
  }
}
