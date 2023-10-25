"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/lib/types/database";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email("El email es inválido")
    .min(1, "El email es requerido"),
  fullname: z.string().min(1, "El nombre completo es requerido"),
});

export default function UpdateGeneralForm({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      email: user?.email !== values.email ? values.email : undefined,
      data: {
        fullname: values.fullname,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
      setIsLoading(false);

      return;
    }

    if (user?.email !== values.email) {
      await supabase.auth.signOut();
      router.push(
        "/auth/sign-in?message=Revise su correo para confirmar el cambio de email y luego inicie sesión con el nuevo."
      );
    }

    setIsLoading(false);
    router.refresh();
  }

  useEffect(() => {
    if (user) {
      form.setValue("email", user.email ?? "");
      form.setValue("fullname", user.user_metadata.fullname);
    }
  }, [form, user]);

  return (
    <div className="grid gap-6">
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nombre completo"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-end gap-x-2">
              <Button
                variant="default"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
                className="max-w-xs w-full whitespace-nowrap"
              >
                <span>
                  {isLoading
                    ? "Actualizando información general..."
                    : "Actualizar información general"}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
