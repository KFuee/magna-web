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
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .email("El email introducido no es válido")
    .min(1, "El email es requerido"),
});

interface ForgotPasswordProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordForm({
  className,
  ...props
}: ForgotPasswordProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(values.email);

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
    router.push(
      "/auth/sign-in?message=Se ha enviado un email de recuperación, por favor revise su bandeja de entrada."
    );
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

            <div className="flex flex-row justify-between items-center whitespace-nowrap space-x-6">
              <Button disabled={isLoading} className="flex-grow">
                {isLoading ? (
                  <span>Enviando...</span>
                ) : (
                  <span>Enviar email de recuperación</span>
                )}
              </Button>

              <Button variant="link">
                <Link href="/auth/sign-in">Volver</Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
