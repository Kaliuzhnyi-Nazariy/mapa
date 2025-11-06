import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? ""
      : "http://localhost:3001/api",
  withCredentials: true,
});

export default api;
