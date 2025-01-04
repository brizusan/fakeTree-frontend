import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <div className="grid py-36 place-content-center dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200 dark:text-gray-700">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Opps!
        </p>

        <p className="mt-4 text-gray-400 dark:text-gray-400">
          Usuario no encontrado
        </p>

        <Link
          to={"/auth/login"}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
