import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../ui/error-message/ErrorMessage";
import { searchByNickname } from "../../services/api";
import { Link } from "react-router-dom";

export const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByNickname,
  });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle);
    mutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && (
        <ErrorMessage>{errors.handle.message?.toString()}</ErrorMessage>
      )}

      <div className="mt-10">
        {mutation.isPending && <p className="text-center">Buscando...</p>}
        {mutation.error && (
          <p className="text-center text-red-400 font-semibold">
            {mutation.error.message}
          </p>
        )}
        {mutation.data && (
          <p className="text-center text-blue-500">
            <span className="font-semibold">{mutation.data}, {" "}</span>
            <Link
              to={`/auth/register`}
              state={{ nickname: slugify(handle)}}
              className=" font-bold text-blue-700 underline-offset-2 underline"
            >
              registrar usuario
            </Link>
          </p> 
          
        )}
      </div>

      <input
        type="submit"
        className="bg-blue-400 p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
        value="Obtener mi DevTree"
      />
    </form>
  );
};
