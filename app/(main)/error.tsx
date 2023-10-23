"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full">
      <div className="max-w-[400px] space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Error desconocido</h2>

        <p className="text-gray-500">
          En caso de que el error persista, por favor contacte al administrador
          proporcionando el siguiente código de error:{" "}
          <span className="text-red-500">{error.digest}</span>
        </p>

        <div className="flex flex-row items-center justify-center space-x-2">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="outline"
          >
            Volver a intentar
          </Button>

          <Button variant="link">
            <Link href="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
