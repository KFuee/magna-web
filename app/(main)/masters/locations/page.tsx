import { CreateLocationDialog } from "@/components/masters/locations/create-dialog";
import { LocationsTable } from "@/components/masters/locations/table";
import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabaseServer";
import { ImportIcon } from "lucide-react";

export default async function LocationsPage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("Locations").select("*");

  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4 min-h-[40px]">
        <h2 className="text-3xl font-bold tracking-tight flex-1">
          Ubicaciones
        </h2>
        <div className="flex items-center justify-end space-x-2 flex-1">
          <CreateLocationDialog />

          <Button variant="default" className="flex-1 sm:flex-grow-0">
            <ImportIcon className="w-5 h-5 mr-2" />
            <span>Importar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <LocationsTable data={data} error={error} />
      </div>
    </div>
  );
}
