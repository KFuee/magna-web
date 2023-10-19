"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/types/database";
import { Tables } from "@/lib/types/database-custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});

export function UpdateInventoryDialog({
  current,
  setUpdateOpened,
}: {
  current: Tables<"Inventories">;
  setUpdateOpened: (value: boolean) => void;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await supabase
      .from("Inventories")
      .update({
        name: values.name,
      })
      .eq("id", current.id);

    setIsLoading(false);
    setUpdateOpened(false);

    form.reset();
    router.refresh();
  }

  useEffect(() => {
    form.reset({
      name: current.name,
    });
  }, [current, form]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Actualizar ubicación</DialogTitle>
        <DialogDescription>
          Formulario actualización de ubicación.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Nombre"
                      type="text"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-y-2">
              <Button
                variant="secondary"
                onClick={(event) => {
                  event.preventDefault();
                  setUpdateOpened(false);
                  form.reset();
                }}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? "Actualizando inventario..."
                    : "Actualizar inventario"}
                </span>
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
