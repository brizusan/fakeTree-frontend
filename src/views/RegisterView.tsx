import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { api } from "../config/axios";
import { toast } from "sonner";
import { ErrorMessage } from "../components";
import type { RegisterForm } from "../types";

export const RegisterView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    name: "",
    email: "",
    nickname:  location.state?.nickname || "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({ defaultValues: initialState });

  const password = watch("password");

  const onHandleRegister = async (dataForm: RegisterForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_confirmation, ...formData } = dataForm;

    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data.message);
      reset(initialState);
      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onHandleRegister)}
        className="bg-white px-5 py-12 rounded-lg space-y-8 mt-10 w-4/6 mx-auto max-w-xl lg:w-full"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", {
              required: "El nombre es obligatorio",
            })}
          />
          {errors.name && (
            <ErrorMessage> {errors.name?.message!.toString()}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "El email no es valido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage> {errors.email?.message!.toString()}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="nickname" className="text-2xl text-slate-500">
            Nickname
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("nickname", {
              required: "El nickname es obligatorio",
            })}
          />
          {errors.nickname && (
            <ErrorMessage> {errors.nickname?.message!.toString()}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "El password es obligatorio",
              minLength: {
                value: 6,
                message: "El password debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage> {errors.password?.message!.toString()}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "Confirmar password es obligatorio",
              validate: (value) =>
                value === password || "Los passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>
              {" "}
              {errors.password_confirmation?.message!.toString()}
            </ErrorMessage>
          )}
        </div>

        <input type="submit" className="cta-form" value="Crear Cuenta" />
      </form>
    </>
  );
};
