import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Table as TanStackTable, flexRender } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDownIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { DeleteConfirmationDialog } from "../delete-confirmation-dialog";

export default function DataTable<T>({
  table,
  globalFilter,
  setGlobalFilter,
}: {
  table: TanStackTable<T>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isDeleteSelectedRowsDialogOpen, setIsDeleteSelectedRowsDialogOpen] =
    useState(false);

  // Obtiene una nueva cadena de búsqueda combinando la actual
  // searchParams con un par clave/valor proporcionado
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setGlobalFilter(value);

    // Actualiza la cadena de consulta con el nuevo valor
    const queryString = createQueryString("filter", value);

    if (!value) {
      router.push(pathname);
      return;
    }

    router.push(`${pathname}?${queryString}`);
  };

  // Establece en la primera carga el valor de búsqueda global
  useEffect(() => {
    const filter = searchParams.get("filter");

    if (!filter) {
      return;
    }

    setGlobalFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center flex-wrap py-4 gap-2">
        <Input
          placeholder="Filtrado por columna(s)..."
          value={globalFilter ?? ""}
          onChange={(event) => handleFilterChange(event)}
          className="lg:max-w-lg w-full"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
        />

        <div className="flex flex-1 flex-row items-center space-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={isDeleteSelectedRowsDialogOpen}
            onOpenChange={setIsDeleteSelectedRowsDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="ml-auto"
                disabled={!table.getFilteredSelectedRowModel().rows.length}
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                <span>Eliminar selección</span>
              </Button>
            </AlertDialogTrigger>

            <DeleteConfirmationDialog
              onAccept={() => {
                table.options.meta?.deleteSelectedRows(
                  table.getFilteredSelectedRowModel().flatRows
                );

                table.resetRowSelection();
              }}
              onCancel={() => setIsDeleteSelectedRowsDialogOpen(false)}
            />
          </AlertDialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
