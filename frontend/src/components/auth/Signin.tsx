import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { customToast } from "../../toasts/toast";
import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../features/tanstackQuery/requests";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidation } from "./validation";
import { useNavigate } from "react-router";
import { getMe } from "../../redux/user/userRequests";

export type SigninForm = {
  email: string;
  password: string;
};

const Signin = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SigninForm>({
    mode: "all",
    resolver: zodResolver(signinValidation),
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigator = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signin({ email, password }),
    onSuccess: async (data: { name: string }) => {
      reset({
        email: "",
        password: "",
      });

      customToast("suc", `Welcome back, ${data.name}!`);
      await dispatch(getMe());
      navigator("/map");
    },
    onError: (err: string) => {
      customToast("err", err);
    },
  });

  const onSubmit: SubmitHandler<SigninForm> = (data) => {
    mutate(data);
  };

  const liStyle =
    "group opacity-50 focus-within:opacity-100 transition-opacity duration-150 flex flex-col gap-1";

  const inputStyle =
    "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <ul className="flex flex-col gap-3">
        <li className={liStyle}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            className={inputStyle}
            disabled={isPending}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </li>
        <li className={liStyle}>
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={inputStyle}
              disabled={isPending}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 -translate-y-1/2 right-1 size-5"
              disabled={isPending}
            >
              {showPassword ? <Eye /> : <EyeClosed />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </li>
      </ul>

      <button
        className="disabled:opacity-50 mt-4 w-full py-2 bg-orange-500 text-white"
        disabled={!isValid || isPending}
      >
        {isPending ? "Loading..." : "Signin"}
      </button>
    </form>
  );
};

export default Signin;
