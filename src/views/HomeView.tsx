import { Header, SearchForm } from "../components";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="bg-gray-100 py-8 min-h-screen lg:bg-home xl:bg-home-xl bg-no-repeat bg-right-top">
        <div className="max-w-5xl mx-auto mt-8 w-11/12 lg:w-full">
          <div className="lg:w-1/2 lg:p-0 px-10 space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold">
              Todas tus <span className="text-cyan-400">Redes Sociales</span> en
              un enlace
            </h1>
            <p className="text-slate-800 text-xl">
              Unete a mas de 200.000 devs. Comparte tu perfil de Tiktok ,
              Facebook , Github y Instagram con tus amigos.
            </p>

            <SearchForm />
          </div>

        </div>
      </main>
    </>
  );
}
