import { InventoryItemsTable } from "@/components/inventories/inventory-items/table";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function InventoryItemsPage({
  params,
}: {
  params: { id: number };
}) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("Inventories")
    .select(
      `
      *,
      InventoryItems (
        *,
        Locations (*),
        Products (*)
      ) 
      `
    )
    .eq("id", params.id)
    .single();

  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4 min-h-[40px]">
        <h2 className="text-3xl font-bold tracking-tight flex-1">
          Inventario {data?.name}
        </h2>
      </div>

      <div className="flex flex-1">
        <InventoryItemsTable data={data?.InventoryItems} error={error} />
      </div>
    </div>
  );
}
