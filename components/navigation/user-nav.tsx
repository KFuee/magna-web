"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/lib/types/database";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserNav({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        sideOffset={8.5}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata.fullname}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/user/settings/general" className="w-full">
            <span>Ajustes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
