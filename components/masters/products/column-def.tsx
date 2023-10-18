import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/lib/types/database-custom";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDownIcon, MoreHorizontalIcon } from "lucide-react";

export const productsColumnDef: ColumnDef<Tables<"Products">>[] = [
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
  {
    accessorKey: "created_at",
    header: "Fecha de creación",
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        {new Date(row.getValue("created_at")).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Menú acciones</span>
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(product.code)}
                >
                  Copiar código
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertDialogTrigger asChild className="w-full">
                    <span>Eliminar</span>
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DeleteConfirmationDialog
              onAccept={() => table.options.meta?.deleteRow(row)}
            />
          </AlertDialog>
        </div>
      );
    },
  },
];
