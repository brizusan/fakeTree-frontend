import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "../components";
import { updateUserProfile, uploadImage } from "../services/api";
import type { User, UserProfile } from "../types";

export default function ProfileView() {
  const queryClient = useQueryClient();
  const data: User = queryClient.getQueryData(["user"])!;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserProfile>({
    defaultValues: {
      nickname: data.nickname || "",
      description: data.description || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          avatar: data.avatar,
        };
      }); // Optimistic querys
    },
  });

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfile = (dataForm: UserProfile) => {
    const user : User = queryClient.getQueryData(["user"])!;
    user.nickname = dataForm.nickname;
    user.description = dataForm.description;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfile)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Editar Información
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Nickname:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Nickname o Nombre de Usuario"
          {...register("nickname", {
            required: "El nickname es requerido",
          })}
        />
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
          {...register("description", {
            required: "La descripcion es requerida",
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Imagen:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChangeAvatar}
        />
      </div>

      <input type="submit" className="cta-form" value="Guardar Cambios" />
    </form>
  );
}
