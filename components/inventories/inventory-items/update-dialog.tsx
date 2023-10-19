"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { SelectOption } from "@/lib/types/common";
import { Database } from "@/lib/types/database";
import { InventoryItem } from "@/lib/types/inventory-item";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  barcode: z.string(),
  quantity: z.string().min(1, "La cantidad es requerida"),
  inventory_id: z.number().nonnegative().min(1, "El inventario es requerido"),
  product_id: z.number().nonnegative().min(1, "El producto es requerido"),
  location_id: z.number().nonnegative().min(1, "La ubicación es requerida"),
  observations: z.string(),
});

export function UpdateInventoryDialog({
  current,
  setUpdateOpened,
}: {
  current: InventoryItem;
  setUpdateOpened: (value: boolean) => void;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const [locations, setLocations] = useState<SelectOption[]>([]);
  const [products, setProducts] = useState<SelectOption[]>([]);
  const [inventories, setInventories] = useState<SelectOption[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      barcode: "",
      quantity: "",
      location_id: 1,
      product_id: 1,
      inventory_id: 1,
      observations: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await supabase
      .from("InventoryItems")
      .update({
        barcode: values.barcode,
        quantity: Number(values.quantity),
        inventory_id: values.inventory_id,
        product_id: values.product_id,
        location_id: values.location_id,
        observations: values.observations,
      })
      .eq("id", current.id);

    setIsLoading(false);
    setUpdateOpened(false);

    form.reset();
    router.refresh();
  }

  useEffect(() => {
    form.reset({
      barcode: current.barcode || "",
      quantity: current.quantity.toString(),
      inventory_id: current.inventory_id,
      product_id: current.product_id,
      location_id: current.location_id,
      observations: current.observations || "",
    });
  }, [current, form]);

  useEffect(() => {
    async function fetchLocations() {
      const { data } = await supabase.from("Locations").select("*");
      const locations = data?.map((location) => ({
        value: location.id,
        label: location.storage_bin,
      }));

      setLocations(locations ?? []);
    }

    async function fetchProducts() {
      const { data } = await supabase.from("Products").select("*");
      const products = data?.map((product) => ({
        value: product.id,
        label: product.code,
      }));

      setProducts(products ?? []);
    }

    async function fetchInventories() {
      const { data } = await supabase.from("Inventories").select("*");
      const inventories = data?.map((inventory) => ({
        value: inventory.id,
        label: inventory.name,
      }));

      setInventories(inventories ?? []);
    }

    fetchLocations();
    fetchProducts();
    fetchInventories();
  }, [supabase]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Actualizar elemento de inventario</DialogTitle>
        <DialogDescription>
          Formulario actualización de elemento de inventario.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Código de barras"
                      type="text"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Cantidad"
                      type="number"
                      min={0}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inventory_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? inventories.find(
                                (inventory) => inventory.value === field.value
                              )?.label
                            : "Inventario"}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar inventario..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {inventories.map((inventory) => (
                            <CommandItem
                              value={inventory.label}
                              key={inventory.value}
                              onSelect={() => {
                                form.setValue("inventory_id", inventory.value);
                              }}
                            >
                              {inventory.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  inventory.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? products.find(
                                (product) => product.value === field.value
                              )?.label
                            : "Producto"}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar producto..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {products.map((product) => (
                            <CommandItem
                              value={product.label}
                              key={product.value}
                              onSelect={() => {
                                form.setValue("product_id", product.value);
                              }}
                            >
                              {product.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  product.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? locations.find(
                                (location) => location.value === field.value
                              )?.label
                            : "Ubicación"}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar ubicación..."
                          className="h-9"
                        />
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              value={location.label}
                              key={location.value}
                              onSelect={() => {
                                form.setValue("location_id", location.value);
                              }}
                            >
                              {location.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  location.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Observaciones"
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
                    ? "Actualizando elemento..."
                    : "Actualizar elemento"}
                </span>
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
