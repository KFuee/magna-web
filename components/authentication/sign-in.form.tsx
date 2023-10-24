"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z
    .string()
    .email("El email introducido no es válido")
    .min(1, "El email es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (!error && data.user?.user_metadata.role !== "administrator") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No tienes permisos para acceder a esta aplicación.",
        duration: 5000,
      });

      await supabase.auth.signOut();

      setIsLoading(false);
      return;
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });

      setIsLoading(false);

      return;
    }

    setIsLoading(false);
    router.push("/");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contraseña"
                      type="password"
                      autoComplete="current-password"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading}>
              {isLoading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <span>Iniciar sesión con email</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
