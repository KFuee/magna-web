import { Separator } from "@/components/ui/separator";
import UpdateSecurityForm from "@/components/user/settings/update-security.form";

export default async function SecuritySettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Seguridad</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza la seguridad de tu cuenta.
        </p>
      </div>

      <Separator />
      <UpdateSecurityForm />
    </div>
  );
}
