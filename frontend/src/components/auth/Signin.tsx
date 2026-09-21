// import { useState } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { customToast } from "../../toasts/toast";
// import { Eye, EyeClosed } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../../features/tanstackQuery/requests";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidation } from "./validation";
import { useNavigate } from "react-router";
import { getMe } from "../../redux/user/userRequests";
import FormInput from "../Input";
import Button from "../Button";

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
    mode: "onChange",
    resolver: zodResolver(signinValidation),
  });

  // const [showPassword, setShowPassword] = useState(false);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <div className="flex flex-col gap-3">
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
        {isPending ? "Loading..." : "Signin"}
      </button> */}

      <Button
        text={isPending ? "Loading..." : "Signin"}
        isDisabled={!isValid || isPending}
      />
    </form>
  );
};

export default Signin;
