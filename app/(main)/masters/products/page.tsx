import { ProductsTable } from "@/components/masters/products/table";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/types/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImportIcon, PlusIcon } from "lucide-react";
import { cookies } from "next/headers";

export default async function ProductsPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.from("Products").select("*");

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
        <div className="flex items-start space-x-2 mt-0">
          <Button variant="default">
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>Crear producto</span>
          </Button>

          <Button variant="default">
            <ImportIcon className="w-5 h-5 mr-2" />
            <span>Importar</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <ProductsTable data={data} />
      </div>
    </div>
  );
}
