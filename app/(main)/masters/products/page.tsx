import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Productos</h2>
        <div className="flex items-start">
          <Button variant="default">Crear producto</Button>
        </div>
      </div>
    </div>
  );
}
