import Image from "next/image";
import { UserNav } from "@/components/navigation/user-nav";
import { NavItems } from "./nav-items";
import { ModeToggle } from "./mode-toggle";

export default function MainNav() {
  return (
    <div className="flex h-16 items-center px-4 border-b">
      <div className="flex items-center text-lg font-medium">
        <Image
          src="/logo.svg"
          alt="Magna Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />

        <NavItems className="mx-4" />
      </div>

      <div className="ml-auto flex items-center space-x-4">
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  );
}
