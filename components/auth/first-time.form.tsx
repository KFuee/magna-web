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

const formSchema = z
  .object({
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirm_password: z
      .string()
      .min(
        6,
        "La confirmación de la contraseña debe tener al menos 6 caracteres"
      ),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

interface FirstTimeFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FirstTimeForm({ className, ...props }: FirstTimeFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });

    if (error) {
      setError(error.message);
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Contraseña"
                      type="password"
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
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirmar contraseña"
                      type="password"
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

            <Button disabled={isLoading}>
              {isLoading ? (
                <span>Estableciendo contraseña...</span>
              ) : (
                <span>Establecer contraseña</span>
              )}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        </form>
      </Form>
    </div>
  );
}
