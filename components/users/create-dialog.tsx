"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import CreateOperatorDialog from "./create-operator-dialog";
import CreateAdministratorDialog from "./create-administrator-dialog";

export function CreateUserDialog() {
  const [isCreateOperatorOpen, setIsCreateOperatorOpen] =
    useState<boolean>(false);
  const [isCreateAdministratorOpen, setIsCreateAdministratorOpen] =
    useState<boolean>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="whitespace-nowrap flex-1 sm:flex-grow-0"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          <span>Crear usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <CreateOperatorDialog
          isOpen={isCreateOperatorOpen}
          setIsOpen={setIsCreateOperatorOpen}
        />

        <CreateAdministratorDialog
          isOpen={isCreateAdministratorOpen}
          setIsOpen={setIsCreateAdministratorOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
