"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOperatorInvitation } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export const createOperatorFormSchema = z.object({
  email: z
    .string()
    .email("El email es inválido")
    .min(1, "El email es requerido"),
  fullname: z.string().min(1, "El nombre completo es requerido"),
  sap_code: z.string().min(1, "El código empleado SAP es requerido"),
  position: z.string().min(1, "El cargo es requerido"),
  organizational_unit: z.string().min(1, "La unidad organizativa es requerida"),
});

export default function CreateOperatorDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createOperatorFormSchema>>({
    resolver: zodResolver(createOperatorFormSchema),
    defaultValues: {
      email: "",
      fullname: "",
      sap_code: "",
      position: "",
      organizational_unit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createOperatorFormSchema>) {
    startTransition(async () => {
      await sendOperatorInvitation(values);
    });

    setIsOpen(false);

    form.reset();
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="w-full cursor-pointer"
        >
          <span>Operario</span>
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear operario</DialogTitle>
          <DialogDescription>
            Formulario creación de usuario operario.
          </DialogDescription>
        </DialogHeader>
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

              <FormField
                control={form.control}
                name="sap_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Código empleado SAP"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Cargo"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organizational_unit"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Unidad organizativa"
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
                    setIsOpen(false);
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
                    {isLoading ? "Creando operario..." : "Crear operario"}
                  </span>
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
