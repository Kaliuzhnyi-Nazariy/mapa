// import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";

import { customToast } from "../../toasts/toast";
// import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../features/tanstackQuery/requests";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidation } from "./validation";
import { getMe } from "../../redux/user/userRequests";
import { useNavigate } from "react-router";
import type { SignupForm } from "../../types/auth";
import FormInput from "../Input";
import Button from "../Button";

const Signup = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignupForm>({
    mode: "onChange",
    resolver: zodResolver(signupValidation),
  });

  // const [showPassword, setShowPassword] = useState(false);

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

  // const liStyle =
  //   "group opacity-50 focus-within:opacity-100 transition-opacity duration-150 flex flex-col gap-2";

  // const inputStyle =
  //   "outline focus:outline-amber-500 transition-colors relative w-full px-2 py-1 rounded";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <div className="flex flex-col gap-3">
        <FormInput
          id="name"
          label="Name"
          isPending={isPending}
          register={register("name")}
          error={errors.name}
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          isPending={isPending}
          register={register("email")}
          error={errors.email}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          isPending={isPending}
          register={register("password")}
          error={errors.password}
        />
      </div>

      {/* <button
        className="disabled:opacity-50 mt-4 w-full py-2 bg-orange-500 text-white"
        disabled={!isValid || isPending}
      >
        {isPending ? "Loading..." : "Signup"}
      </button> */}

      <Button
        text={isPending ? "Loading..." : "Signup"}
        isDisabled={!isValid || isPending}
      />
    </form>
  );
};

export default Signup;
