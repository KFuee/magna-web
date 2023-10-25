"use client";

import Image from "next/image";
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
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/assets/logo.svg"
              alt="Magna Logo"
              className="invert text-white"
              width={100}
              height={23.51}
              priority
            />
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Aplicación para realización de inventarios de stock
              </p>

              <footer className="text-sm">&copy; Magna 2023</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 h-full flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Iniciar sesión
              </h1>

              <p className="text-sm text-muted-foreground">
                Introduce tus credenciales a continuación para acceder a la
                plataforma
              </p>
            </div>

            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
