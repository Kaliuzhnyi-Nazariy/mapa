import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api",
  withCredentials: true,
});

export default api;
