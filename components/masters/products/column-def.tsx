import { createBaseColumnDef } from "@/lib/table/base-column-def";
import { Tables } from "@/lib/types/database-custom";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon } from "lucide-react";

const customDef: ColumnDef<Tables<"Products">>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center space-x-2 cursor-pointer w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Código</span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase whitespace-nowrap">{row.getValue("code")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        {row.getValue("description")}
      </div>
    ),
  },
];

export const productsColumnDef =
  createBaseColumnDef<Tables<"Products">>(customDef);
