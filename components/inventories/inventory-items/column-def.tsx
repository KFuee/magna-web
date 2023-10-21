import { createBaseColumnDef } from "@/lib/table/base-column-def";
import { InventoryItem } from "@/lib/types/inventory-item";
import { ColumnDef } from "@tanstack/react-table";

const customDef: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "barcode",
    header: () => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <span>Código de barras</span>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("barcode") || "-"}</div>,
  },
  {
    accessorKey: "Locations",
    accessorFn: (row) => row.Locations?.storage_bin,
    header: () => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <span>Código de contenedor</span>
        </div>
      );
    },
    cell: ({ row }) => <div>{row.getValue("Locations") || "-"}</div>,
  },
  {
    accessorKey: "Products",
    accessorFn: (row) => row.Products?.code,
    header: "Producto",
    cell: ({ row }) => <div>{row.getValue("Products")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "observations",
    header: "Observaciones",
    cell: ({ row }) => <div>{row.getValue("observations") || "-"}</div>,
  },
];

export const inventoryItemsColumnDef =
  createBaseColumnDef<InventoryItem>(customDef);
