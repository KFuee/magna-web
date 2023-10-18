"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteConfirmationDialog({
  onCancel,
  onAccept,
}: {
  onCancel?: () => void;
  onAccept?: () => void;
}) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Se eliminará permanentemente de la
          base de datos y no se podrá recuperar.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onAccept}>Eliminar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
