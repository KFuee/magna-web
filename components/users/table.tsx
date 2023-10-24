"use client";

import DataTable from "@/components/table/data-table";
import { usersColumnDef } from "./column-def";
import { User } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/hooks/use-table-definition";
import { UpdateUserDialog } from "./update-dialog";
import { useTransition } from "react";
import { deleteUser, deleteUsers } from "@/lib/actions";
import { AuthError } from "@supabase/supabase-js";

export function UsersTable({
  data,
  error,
}: {
  data: User[] | null;
  error: AuthError | null;
}) {
  const router = useRouter();

  const [_isDeleting, startTransition] = useTransition();

  const { table, globalFilter, setGlobalFilter } = useTableDefinition<User>({
    data,
    error,
    columns: usersColumnDef,
    meta: {
      updateComponent: (row, setUpdateOpened) => (
        <UpdateUserDialog
          current={row.original}
          setUpdateOpened={setUpdateOpened}
        />
      ),
      deleteRow: async (row) => {
        startTransition(async () => {
          await deleteUser(row.original.id);
        });

        router.refresh();
      },
      deleteSelectedRows: async (rows) => {
        startTransition(async () => {
          await deleteUsers(rows.map((row) => row.original.id));
        });

        router.refresh();
      },
    },
  });

  return (
    <DataTable
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
