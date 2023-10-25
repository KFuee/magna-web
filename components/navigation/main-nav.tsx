import Image from "next/image";
import { UserNav } from "@/components/navigation/user-nav";
import { NavItems } from "./nav-items";
import { ModeToggle } from "./mode-toggle";
import { supabaseServer } from "@/lib/supabaseServer";
import { MobileNav } from "./mobile-nav";

export default async function MainNav() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex h-16 items-center px-6 border-b">
      <div className="flex items-center text-lg font-medium">
        <Image
          src="/assets/logo.svg"
          alt="Magna Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />

        <NavItems className="hidden sm:block ms-4" />
      </div>

      <div className="ml-auto items-center space-x-4 hidden sm:flex">
        <ModeToggle />
        <UserNav user={user} />
      </div>

      <div className="ml-auto items-center space-x-4 flex sm:hidden">
        <MobileNav user={user} />
      </div>
    </div>
  );
}
