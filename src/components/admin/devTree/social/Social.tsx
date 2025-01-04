import { Switch } from "@headlessui/react";

type SocialProps = {
  name: string;
  url: string;
  enabled: boolean;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableNetwork: (social: string) => void;
};

export const Social = ({
  name,
  url,
  enabled,
  handleUrlChange,
  handleEnableNetwork,
}: SocialProps) => {
  const noEdit = url !== "" && enabled;

  return (
    <div className="flex items-center  gap-4 bg-white shadow-sm p-4 rounded-sm">
      <img
        className="object-cover w-10 h-10"
        src={`./social/icon_${name}.svg`}
        alt={`imagen de ${name}`}
      />
      <input
        type="text"
        name={name}
        id={name}
        value={url}
        onChange={handleUrlChange}
        disabled={noEdit}
        className={`${
          noEdit ? "bg-gray-100/90 text-gray-400 cursor-not-allowed" : ""
        } text-black flex-1 rounded-md border-gray-300 `}
      />

      <Switch
        checked={enabled}
        onChange={() => {
          handleEnableNetwork(name);
        }}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
    </div>
  );
};
