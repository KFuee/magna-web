import { ForgotPasswordForm } from "@/components/auth/forgot-password.form";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Contraseña olvidada
        </h1>

        <p className="text-sm text-muted-foreground">
          Introduzca su email para recuperar su contraseña
        </p>
      </div>

      <ForgotPasswordForm />
    </>
  );
}
