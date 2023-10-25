import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/user/settings/sidebar-nav";

const sidebarNavItems = [
  {
    title: "General",
    href: "/user/settings/general",
  },
  {
    title: "Seguridad",
    href: "/user/settings/security",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Configuración de la cuenta
        </h2>
        <p className="text-muted-foreground">
          Actualiza tu información personal y de seguridad
        </p>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>

        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
