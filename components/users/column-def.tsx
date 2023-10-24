import { createBaseColumnDef } from "@/lib/table/base-column-def";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@supabase/supabase-js";
import { getDateString } from "@/lib/utils";
import { Badge } from "../ui/badge";

const customDef: ColumnDef<User>[] = [
  {
    accessorKey: "confirmed_at",
    header: "Estado",
    cell: ({ row }) => (
      <Badge variant={row.getValue("confirmed_at") ? "outline" : "destructive"}>
        <span className="whitespace-nowrap">
          {row.getValue("confirmed_at") ? "Confirmado" : "Sin confirmar"}
        </span>
      </Badge>
    ),
    enableColumnFilter: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "role",
    header: "Rol",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "last_sign_in_at",
    header: "Último inicio de sesión",
    cell: ({ row }) => (
      <div>{getDateString(row.getValue("last_sign_in_at"))}</div>
    ),
    enableColumnFilter: false,
  },
];

export const usersColumnDef = createBaseColumnDef<User>(customDef);
