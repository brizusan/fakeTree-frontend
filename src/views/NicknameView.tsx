import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { getUserProfile } from "../services/api";
import { LinkTreeLinks } from "../types";

export default function NicknameView() {
  const { nickname } = useParams();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getUserProfile(nickname!),
    queryKey: ["nickname", nickname],
    retry: 1,
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <Navigate to="/404" />;

  const avaliableLinks = JSON.parse(user!.links).filter(
    (link: LinkTreeLinks) => link.enabled
  );


  if (user)
    return (
      <div className="space-y-5 my-16 text-white">
        <h1 className="text-4xl font-semibold capitalize text-center">
          {user.nickname}
        </h1>
        {user.avatar && (
          <img
            src={user.avatar}
            alt={`imagen de ${user.nickname}`}
            className="mx-auto rounded-full w-32 h-32"
          />
        )}
        <p className="text-center text-lg">{user.description}</p>

        <h2 className="text-center text-xl font-bold uppercase">
          Mis Redes Sociales
        </h2>
        
        {
          avaliableLinks.length === 0 ? (
            <p className="text-center text-lg">
              No hay redes sociales disponibles
            </p>
          ) : (
            avaliableLinks.map((link: LinkTreeLinks) => (
              <Link
            to={link.url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex max-w-md transition-transform hover:scale-105 mx-auto bg-white hover:bg-gray-100 items-center justify-between px-10 rounded-md py-1 flex-1 "
          >
            <img
              src={`./social/icon_${link.name}.svg`}
              alt={`imagen de ${link.name}`}
              className="w-14 h-14 lg:w-16 lg:h-16"
            />
            <p className=" text-center text-gray-600 hover:text-gray-950 capitalize text-xl font-semibold">
              ver  <span className="font-bold">{link.name}</span>
            </p>
          </Link>
            ))
          )
        }
      </div>
    );
}
