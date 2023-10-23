import { CreateUserDialog } from "@/components/users/create-dialog";
import { UsersTable } from "@/components/users/table";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function UsersPage() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    throw error;
  }

  return (
    <div className="flex flex-1 flex-col p-6 min-h-full space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4 min-h-[40px]">
        <h2 className="text-3xl font-bold tracking-tight flex-1">Usuarios</h2>
        <div className="flex items-center justify-end space-x-2 flex-1">
          <CreateUserDialog />
        </div>
      </div>

      <div className="flex flex-1">
        <UsersTable data={data.users} />
      </div>
    </div>
  );
}
