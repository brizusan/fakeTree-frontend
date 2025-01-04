import { Outlet, useLocation } from "react-router-dom";
import { Logo, Navegacion } from "../components";
import { Toaster } from "sonner";

export default function AuthLayout() {
  const pathname = useLocation().pathname;
  const isLogin = pathname === "/auth/login";
  const isRegister = pathname === "/auth/register";

  return (
    <>
      <div className="min-h-screen bg-slate-800 ">
        <div className="max-w-lg mx-auto pt-8 px-5">
          <Logo />
        </div>

        <div className="my-10">
          {isLogin && (
            <h1 className="text-white text-center text-3xl font-semibold">
              Iniciar Sesión
            </h1>
          )}
          {isRegister && (
            <h1 className="text-white text-center text-3xl font-semibold">
              Registrarse
            </h1>
          )}
        </div>

        <div className="my-8 max-w-2xl mx-auto">
          <Outlet />
        </div>
         <Navegacion />
      </div>

      <Toaster position="top-right" richColors />
    </>
  );
}
