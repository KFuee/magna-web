import { Row } from "@tanstack/react-table";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Tables } from "@/lib/types/database-custom";
import Link from "next/link";

export default function InventoriesAditionalActions({
  row,
}: {
  row: Row<Tables<"Inventories">>;
}) {
  return (
    <>
      <DropdownMenuItem>
        <Link
          href={`/inventories/${encodeURIComponent(row.original.id)}`}
          className="w-full"
        >
          <span>Ver</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}
