import { FirstTimeForm } from "@/components/auth/first-time.form";

export default function ChangePasswordPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Establecer contraseña
        </h1>

        <p className="text-sm text-muted-foreground">
          Introduzca su nueva contraseña a continuación para recuperar el acceso
          a su cuenta
        </p>
      </div>

      <FirstTimeForm />
    </>
  );
}
