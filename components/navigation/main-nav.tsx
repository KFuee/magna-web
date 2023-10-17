import Image from "next/image";
import { UserNav } from "@/components/navigation/user-nav";
import { NavItems } from "./nav-items";
import { ModeToggle } from "./mode-toggle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database";
import { cookies } from "next/headers";

export default async function MainNav() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex h-16 items-center px-6 border-b">
      <div className="flex items-center text-lg font-medium">
        <Image
          src="/logo.svg"
          alt="Magna Logo"
          className="dark:invert me-4"
          width={100}
          height={24}
          priority
        />

        <NavItems />
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserNav session={session} />
      </div>
    </div>
  );
}
