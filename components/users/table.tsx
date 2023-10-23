"use client";

import DataTable from "@/components/table/data-table";
import { usersColumnDef } from "./column-def";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { useRouter } from "next/navigation";
import { useTableDefinition } from "@/lib/table/use-table-definition";
import { UpdateUserDialog } from "./update-dialog";
import { useTransition } from "react";
import { deleteUser } from "@/lib/actions";

export function UsersTable({ data }: { data: User[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [_isDeleting, startTransition] = useTransition();

  const { table, rowSelection, globalFilter, setGlobalFilter } =
    useTableDefinition<User>({
      data,
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
      },
    });

  return (
    <DataTable
      table={table}
      rowSelection={rowSelection}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );
}
