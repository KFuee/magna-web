import { Tables } from "./database-custom";

export type InventoryItem = Tables<"InventoryItems"> & {
  Locations: Tables<"Locations"> | null;
  Products: Tables<"Products"> | null;
};
