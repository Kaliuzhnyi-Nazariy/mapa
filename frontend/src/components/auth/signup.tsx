import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";

import { customToast } from "../../toasts/toast";
import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../features/tanstackQuery/requests";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidation } from "./validation";
import { getMe } from "../../redux/user/userRequests";
import { useNavigate } from "react-router";

export type SignupForm = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignupForm>({
    mode: "all",
    resolver: zodResolver(signupValidation),
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigator = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupForm) => signup(data),
    onSuccess: async (data: { name: string }) => {
      reset({
        name: "",
        email: "",
        password: "",
      });

      await dispatch(getMe());

      customToast("suc", `Welcome, ${data.name}!`);
      navigator("/map");
    },
    onError: (err: string) => {
      customToast("err", err);
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
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
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className={inputStyle}
            disabled={isPending}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </li>
        <li className={liStyle}>
          <label htmlFor="email">Email:</label>

          <input
            id="email"
            type="email"
            {...register("email")}
            className={inputStyle}
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </li>
        <li className="group opacity-50 focus-within:opacity-100 transition-opacity duration-150">
          <label htmlFor="password">Password:</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={inputStyle}
              disabled={isPending}
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
        {isPending ? "Loading..." : "Signup"}
      </button>
    </form>
  );
};

export default Signup;
