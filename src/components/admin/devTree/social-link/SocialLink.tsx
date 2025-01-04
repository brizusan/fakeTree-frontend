import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";

type SocialLinkProps = {
  id: number;
  name: string;
  url: string;
};

export const SocialLink = ({ id, name, url }: SocialLinkProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full "
      {...attributes}
      {...listeners}
    >
      <div
        key={id}
        className="flex w-full bg-white hover:bg-gray-200 items-center justify-between px-10 rounded-md py-2 flex-1 "
      >
        <img
          src={`../social/icon_${name}.svg`}
          alt={`imagen de ${name}`}
          className="w-12 h-12"
        />
        <Link
          to={url}
          target="_blank"
          rel="noreferrer noopener"
          className=" text-center text-gray-600 hover:text-gray-950 capitalize text-lg font-semibold"
        >
          {name}
        </Link>
      </div>
    </div>
  );
};
