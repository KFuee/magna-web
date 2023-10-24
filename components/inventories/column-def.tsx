import { createBaseColumnDef } from "@/lib/table/base-column-def";
import { Tables } from "@/lib/types/database-custom";
import { getDateString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const customDef: ColumnDef<Tables<"Inventories">>[] = [
  {
    accessorKey: "closed_at",
    header: "Estado",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 capitalize whitespace-nowrap">
        {row.getValue("closed_at") ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Badge variant="destructive">
                  <span className="whitespace-nowrap">Cerrado</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <span className="whitespace-nowrap">
                  Cerrado el {getDateString(row.getValue("closed_at"))}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Badge variant="outline">
            <span className="whitespace-nowrap">Abierto</span>
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
];

export const inventoriesColumnDef =
  createBaseColumnDef<Tables<"Inventories">>(customDef);
