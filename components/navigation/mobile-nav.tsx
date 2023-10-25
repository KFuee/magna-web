import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { UserNav } from "./user-nav";
import { User } from "@supabase/auth-helpers-nextjs";
import { Separator } from "../ui/separator";
import { forwardRef } from "react";
import Link from "next/link";

const components: { title: string; href: string }[] = [
  {
    title: "Inventarios",
    href: "/inventories",
  },
  {
    title: "Productos",
    href: "/masters/products",
  },
  {
    title: "Ubicaciones",
    href: "/masters/locations",
  },
  {
    title: "Usuarios",
    href: "/users",
  },
];

export function MobileNav({ user }: { user: User | null }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Menú de navegación de la aplicación</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <div className="flex flex-col items-start h-full">
          <ul className="flex-1 flex flex-col items-start w-full space-y-4 py-8">
            {components.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.href}
                className="h-full"
              />
            ))}
          </ul>

          <SheetFooter className="w-full">
            <div className="flex flex-col items-start justify-center w-full space-y-2">
              <Separator className="my-2" />

              <div className="flex items-end w-full h-full">
                <div className="flex items-center justify-between w-full">
                  <ModeToggle />
                  <UserNav user={user} />
                </div>
              </div>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <Link
        ref={ref}
        className={cn(
          "flex w-full font-medium leading-none rounded-md",
          className
        )}
        {...props}
      >
        <div className="text-xl font-medium leading-none">{title}</div>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
