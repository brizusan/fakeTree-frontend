import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { NavegacionTab } from "../../../navegacion-tab/NavegacionTab";
import type { LinkTreeLinks, SocialNetwork, User } from "../../../../types";
import { SocialLink } from "../social-link/SocialLink";
import { useQueryClient } from "@tanstack/react-query";

type ProfileProps = {
  user: User;
};

export const Profile = ({ user }: ProfileProps) => {
  const [socialMedia, setSocialMedia] = useState<SocialNetwork[]>(
    user.links !== "" &&
      JSON.parse(user.links).filter((item: LinkTreeLinks) => item.enabled)
  );

  useEffect(() => {
    if (user.links === "") return;
    const links = JSON.parse(user.links).filter(
      (item: LinkTreeLinks) => item.enabled
    );
    setSocialMedia(links);
  }, [user.links]);

  const queryClient = useQueryClient();
  

  const handleDragEnd = ({over , active} : DragEndEvent) => {

    const prevIndex = socialMedia.findIndex((item) => item.id === active.id);
    const newIndex = socialMedia.findIndex((item) => item.id === over?.id);

    const order = arrayMove(socialMedia, prevIndex, newIndex);
    setSocialMedia(order);
    
    const disabledLinks:SocialNetwork[] = JSON.parse(user.links).filter((item:SocialNetwork) => !item.enabled);

    const linksOrder = [...disabledLinks, ...order];

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(linksOrder),
      };
    })
  };

  return (
    <>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavegacionTab />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${user.nickname}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{user.nickname}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-8 lg:space-y-10">
              <h3 className="text-center text-white font-semibold text-2xl lg:text-4xl">
                {user.nickname}
              </h3>

              {user.avatar && (
                <img
                  src={user?.avatar}
                  alt={`imagen de perfil de ${user.name}`}
                  className="mx-auto max-w-[350px]"
                />
              )}

              <p className="text-center text-white text-lg font-semibold">
                {user.description ? user.description : "No hay una descripcion"}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={socialMedia}
                  strategy={verticalListSortingStrategy}
                >
                  {socialMedia.length > 0 && (
                    <div className="flex flex-col gap-3 items-center ">
                      <h3 className="text-xl font-semibold text-white">
                        Mis Redes Sociales
                      </h3>
                      {socialMedia.map((link: SocialNetwork) => (
                        <SocialLink key={link.name} {...link} />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
};
