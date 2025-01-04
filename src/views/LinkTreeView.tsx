import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LinkTreeLinks, User, SocialNetwork } from "../types";
import { Social } from "../components";
import { social } from "../data/social";
import { isValidURL } from "../utils";
import { updateUserProfile } from "../services/api";

export default function LinkTreeView() {
  const [networks, setNetworks] = useState(social);
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Enlaces actualizados");
    },
  });

  useEffect(() => {
    const updateData = networks.map((network) => {
      const userLink = JSON.parse(user.links).find(
        (link: LinkTreeLinks) => link.name === network.name
      );
      if (userLink) {
        return {
          ...network,
          url: userLink.url,
          enabled: userLink.enabled,
        };
      }

      return network;
    });

    setNetworks(updateData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updateLinkUrl = networks.map((network) =>
      network.name === name ? { ...network, url: value } : network
    );

    setNetworks(updateLinkUrl);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableNetwork = (social: string) => {
    const updatedNetworks = networks.map((network) => {
      if (network.name === social) {
        if (isValidURL(network.url)) {
          return { ...network, enabled: !network.enabled };
        } else {
          toast.error("La URL no es válida");
        }
      }
      return network;
    });

    setNetworks(updatedNetworks);

    const selectLinkSocial = updatedNetworks.find(
      (network) => network.name === social
    );

    let updateAvaliableLinks: SocialNetwork[] = [];

    // saber si habilitamos
    if (selectLinkSocial?.enabled) {
      // obtener el ultimo id
      const lastId = links.filter((link) => link.id).length + 1;

      if (links.some((link) => link.name === social)) {
        updateAvaliableLinks = links.map((link) => {
          if (link.name === social) {
            return { ...link, enabled: true, id: lastId };
          } else {
            return link;
          }
        });
      } else {
        const newLink: SocialNetwork = {
          ...selectLinkSocial,
          id: lastId,
        };
        updateAvaliableLinks = [...links, newLink];
      }
    } else {
      // obtener indice del enlace
      const indexSocial = links.findIndex((link) => link.name === social);

      updateAvaliableLinks = links.map((link) => {
        if (link.name === social) {
          return { ...link, enabled: false, id: 0 };

        // TODO : arreglar bug de actualizar el id
        } else if (link.id > indexSocial && (indexSocial !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    // setear los links en la base de datos
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updateAvaliableLinks),
      };
    });
  };

  return (
    <>
      <div className="space-y-3">
        {networks.map((network) => (
          <Social
            key={network.name}
            handleUrlChange={handleUrlChange}
            handleEnableNetwork={handleEnableNetwork}
            {...network}
          />
        ))}

        <button
          className="bg-blue-500 hover:bg-blue-600 transition-colors py-3 px-8
           text-white uppercase font-bold text-xs rounded-lg cursor-pointer"
          //TODO : TOMAR VALORES DE LA CACHE ACTUALIZADA
           onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}
