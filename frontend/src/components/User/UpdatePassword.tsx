import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "./Header";
import type { PasswordsType } from "../../types/user";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "../../features/user/request";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordValidation } from "./UserValidation";
import FormInput from "../Input";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const defaultValues: PasswordsType = {
    password: "",
    confirmPassword: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (newPassword: PasswordsType) => updateUserPassword(newPassword),
    onSuccess() {
      navigate("/user");
      reset(defaultValues);
    },
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<PasswordsType>({
    mode: "onChange",
    resolver: zodResolver(updatePasswordValidation),
  });

  const handleSubmitFn: SubmitHandler<PasswordsType> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header link="/user" title="Update password" />

      <div className="flex items-center justify-center flex-1 grow">
        <form
          className="w-4/5 mx-auto flex flex-col justify-center gap-2"
          onSubmit={handleSubmit(handleSubmitFn)}
        >
          <FormInput
            id="password"
            label="Password"
            register={register("password")}
            error={errors.password}
            isPending={isPending}
            type="password"
          />

          <FormInput
            id="confirmPassword"
            label="Confirm password"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            isPending={isPending}
            type="password"
          />

          <Button text="Submit" type="submit" isDisabled={false} />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
