"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen">
      <div className="max-w-[400px] space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Página no encontrada
        </h2>

        <p className="text-gray-500 text-center">
          La página solicitada no existe o no se encuentra disponible
        </p>

        <div className="flex flex-row items-center justify-center">
          <Button variant="link">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
