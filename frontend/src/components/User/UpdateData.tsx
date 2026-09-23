import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "./Header";
import type { UpdateForm } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../features/user/request";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/dispatch";
import { getMe } from "../../redux/user/userRequests";
import { useSelector } from "react-redux";
import { userEmail, username } from "../../redux/user/selectors";
import Button from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserData } from "./UserValidation";
import FormInput from "../Input";

const UpdateData = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const userName = useSelector(username);
  const email = useSelector(userEmail);

  // const defaultValues: UpdateForm = {
  //   email: "",
  //   name: "",
  // };

  const {
    register,
    formState: { errors },
    // reset,
    handleSubmit,
  } = useForm({
    values: {
      email: email ?? "",
      name: userName ?? "",
    },
    mode: "onChange",
    resolver: zodResolver(updateUserData),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newData: UpdateForm) => updateUser(newData),
    async onSuccess() {
      await dispatch(getMe());
      navigate("/user");
    },
  });

  const submitHandlerFn: SubmitHandler<UpdateForm> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col h-dvh">
      <Header link="/user" title="Update data" />

      <div className="flex items-center justify-center flex-1 grow">
        <form
          className="w-4/5 mx-auto flex flex-col justify-center gap-2 "
          onSubmit={handleSubmit(submitHandlerFn)}
        >
          <FormInput
            id="name"
            label="Name"
            register={register("name")}
            error={errors.name}
            isPending={isPending}
          />
          <FormInput
            id="email"
            label="Email"
            register={register("email")}
            error={errors.email}
            isPending={isPending}
            type="email"
          />
          {/* <button type="submit">Update</button> */}
          <Button isDisabled={isPending} text="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
