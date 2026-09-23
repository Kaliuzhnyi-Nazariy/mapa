import axios from "axios";
import api, { resetAuthToken, setAuthToken } from "../../redux/api.config";

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post("/auth/signin", { email, password });

    setAuthToken(data.token);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};

export const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post("/auth/signup", { name, email, password });

    setAuthToken(data.token);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};

export const signout = async () => {
  try {
    const data = (await api.post("/auth/signout")).data;

    resetAuthToken();

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message;
    }

    throw error;
  }
};
