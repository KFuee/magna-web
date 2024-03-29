import { FirstTimeForm } from "@/components/auth/first-time.form";

export default function FirstTimePage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Establecer contraseña
        </h1>

        <p className="text-sm text-muted-foreground">
          Parece que es la primera vez que inicia sesión, por favor establezca
          una contraseña para continuar
        </p>
      </div>

      <FirstTimeForm />
    </>
  );
}
