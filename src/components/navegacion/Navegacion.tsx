import {
  Link,
  useLocation,
} from "react-router-dom";

export const Navegacion = () => {
  const pathname = useLocation().pathname;
  const isLogin = pathname === "/auth/login";

  return (
    <>
      <nav className="max-w-7xl mx-auto text-center pb-6">
        {!isLogin ? (
          <Link className="text-gray-300 hover:text-blue-400" to="/auth/login">
            ¿Ya tienes una cuenta ? Iniciar Sesion
          </Link>
        ) : (
          <Link
            className="text-gray-300 hover:text-blue-400"
            to="/auth/register"
          >
            ¿No tienes una cuenta ? Registrate
          </Link>
        )}
      </nav>
    </>
  );
};
