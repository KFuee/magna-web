"use client";

import { SignInForm } from "@/components/auth/sign-in.form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function SignInPage() {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  useEffect(() => {
    const message = searchParams.get("message");
    if (!message) {
      return;
    }

    const { dismiss } = toast({
      description: message,
      variant: "default",
      duration: 1000000,
    });

    return () => {
      dismiss();
    };
  }, [searchParams, toast]);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Iniciar sesión
        </h1>

        <p className="text-sm text-muted-foreground">
          Introduzca sus credenciales a continuación para acceder a la
          plataforma
        </p>
      </div>

      <SignInForm />
    </>
  );
}
