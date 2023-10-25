import { Separator } from "@/components/ui/separator";
import UpdateGeneralForm from "@/components/user/settings/update-general.form";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function GeneralSettingsPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza tu información personal.
        </p>
      </div>

      <Separator />
      <UpdateGeneralForm user={user} />
    </div>
  );
}
