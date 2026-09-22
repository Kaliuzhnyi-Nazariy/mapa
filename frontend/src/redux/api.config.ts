import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://mapa-app.onrender.com/api"
    : "http://localhost:3001/api",
  withCredentials: true,
});

export default api;
