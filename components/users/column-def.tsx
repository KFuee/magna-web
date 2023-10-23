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
        {row.getValue("confirmed_at") ? "Confirmado" : "Sin confirmar"}
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
    header: () => {
      return (
        <div className="flex items-center whitespace-nowrap">
          <span>Último inicio de sesión</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center capitalize whitespace-nowrap">
        {getDateString(row.getValue("last_sign_in_at"))}
      </div>
    ),
    enableColumnFilter: false,
  },
];

export const usersColumnDef = createBaseColumnDef<User>(customDef);
