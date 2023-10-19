import { MoreHorizontalIcon } from "lucide-react";
import { DeleteConfirmationDialog } from "../delete-confirmation-dialog";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Row, Table } from "@tanstack/react-table";

export default function TableActions({
  row,
  table,
}: {
  row: Row<any>;
  table: Table<any>;
}) {
  const [updateOpened, setUpdateOpened] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-end space-x-2">
      <Dialog open={updateOpened} onOpenChange={setUpdateOpened}>
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
              {table.options.meta?.aditionalActions
                ? table.options.meta?.aditionalActions?.(row)
                : null}

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger asChild className="w-full">
                  <span>Editar</span>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertDialogTrigger asChild className="w-full">
                  <span>Eliminar</span>
                </AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {table.options.meta?.updateComponent(row, setUpdateOpened) ?? null}

          <DeleteConfirmationDialog
            onAccept={() => table.options.meta?.deleteRow(row)}
          />
        </AlertDialog>
      </Dialog>
    </div>
  );
}
