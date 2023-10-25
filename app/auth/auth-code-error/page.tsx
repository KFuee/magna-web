"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-screen">
      <div className="max-w-[400px] space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Error de autenticación
        </h2>

        <p className="text-gray-500 text-center">
          No se pudo completar el proceso de autenticación. Por favor, intenta
          acceder al enlace de nuevo. En caso de persistir el error, contacta
          con el administrador para obtener una nueva invitación
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
