import axios from "axios";
import type { UpdateForm } from "../../types/auth";
import api from "../../redux/api.config";
import type { PasswordsType } from "../../types/user";

export const updateUser = async ({ email, name }: UpdateForm) => {
  try {
    return (
      await api.put(
        "/user/update",
        { email, name },
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        },
      )
    ).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};

export const updateUserPassword = async ({
  password,
  confirmPassword,
}: PasswordsType) => {
  try {
    return (await api.patch("/user/password", { password, confirmPassword }))
      .data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};

export const deleteUser = async () => {
  try {
    return (await api.delete("/user/")).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};
