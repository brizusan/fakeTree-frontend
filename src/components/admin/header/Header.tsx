import { Link, useLocation } from "react-router-dom";
import { Logo } from "../../ui/logotipo/Logo";
import { useQueryClient } from "@tanstack/react-query";

export const Header = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const isHome = location.pathname === "/";

  const logout = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    localStorage.removeItem("auth_token");
    alert("Sesion cerrada");
  };

  return (
    <header className="bg-slate-800 py-5">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
        <div className="w-full p-5 lg:p-0 md:w-1/3">
          <Logo />
        </div>
        <div className="md:w-1/3 md:flex md:justify-end">
          {!isHome ? (
            <button 
              onClick={logout} className="bg-cyan-300 hover:bg-cyan-600 transition-colors p-3 text-slate-900 uppercase font-black text-xs rounded-lg cursor-pointer">
              Cerrar Sesión
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                to="/auth/login"
                className="bg-cyan-100 hover:bg-cyan-300 transition-colors p-3 text-slate-700 uppercase font-bold text-xs rounded-lg cursor-pointer"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/auth/register"
                className="bg-blue-500 hover:bg-blue-600 transition-colors p-3 text-white uppercase font-semibold text-xs rounded-lg cursor-pointer"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
