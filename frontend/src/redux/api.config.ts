import axios from "axios";

const api = axios.create({
  // baseURL: "/api",
  baseURL:
    import.meta.env.NODE_ENV === "production"
      ? "https://mapa-app.onrender.com/api"
      : "http://localhost:3001/api",
  withCredentials: true,
});

export default api;
