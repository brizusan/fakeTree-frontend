import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {isAxiosError} from "axios"
import { toast } from "sonner";
import { ErrorMessage } from "../components";
import { LoginForm } from "../types";
import { api } from "../config/axios";

export const LoginView = () => {

  const navigate = useNavigate()

  const initialState = {
    email: "",
    password: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({  defaultValues: initialState });

  const handleLogin = async (dataForm: LoginForm) => {

    try {
      const res = await api.post("/auth/login", dataForm);
      localStorage.setItem("auth_token", res.data.token)
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/admin/profile")
      },1500)

    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message)
      }
    }
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-12 rounded-lg space-y-4 mt-10 max-w-xl mx-auto"
        noValidate
      >
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
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="cta-form"
          value="Iniciar Sesión"
        />
      </form>
     
    </>
  );
};
