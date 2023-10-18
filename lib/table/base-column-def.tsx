import TableActions from "@/components/table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { getDateString } from "../utils";

export const createBaseColumnDef = <T,>(
  customDef: ColumnDef<T>[]
): ColumnDef<T>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...customDef,
    {
      accessorKey: "created_at",
      header: "Fecha de creación",
      cell: ({ row }) => (
        <div className="capitalize whitespace-nowrap">
          {getDateString(row.getValue("created_at"))}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row, table }) => {
        return <TableActions row={row} table={table} />;
      },
    },
  ];
};
