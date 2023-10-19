import { CreateInventoryDialog } from "@/components/inventories/create-dialog";
import { InventoriesTable } from "@/components/inventories/table";
import { Button } from "@/components/ui/button";
import supabaseServer from "@/lib/supabaseServer";
import { ImportIcon } from "lucide-react";

export default async function InventoriesPage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("Inventories").select("*");

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-3xl font-bold tracking-tight flex-1">
          Inventarios
        </h2>
        <div className="flex items-center justify-end space-x-2 mt-0 flex-1">
          <CreateInventoryDialog />

          <Button variant="default" className="flex-1 sm:flex-grow-0">
            <ImportIcon className="w-5 h-5 mr-2" />
            <span>Importar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <InventoriesTable data={data} />
      </div>
    </div>
  );
}
