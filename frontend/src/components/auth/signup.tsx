import { useAppDispatch } from "../../redux/dispatch";

import { customToast } from "../../toasts/toast";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidation } from "./validation";
import { getMe, signup } from "../../redux/user/userRequests";
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

  const navigator = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupForm) => {
      return await dispatch(signup(data)).unwrap();
    },
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
    onError: (err: { message: string }) => {
      customToast("err", err.message);
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    mutate(data);
  };

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

      <Button
        text={isPending ? "Loading..." : "Signup"}
        isDisabled={!isValid || isPending}
      />
    </form>
  );
};

export default Signup;
