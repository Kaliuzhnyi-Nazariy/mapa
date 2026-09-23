import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://mapa-app.onrender.com/api"
    : "http://localhost:3001/api",
  // withCredentials: true,
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const resetAuthToken = () => {
  api.defaults.headers.common.Authorization = "";
};

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.PROD ? "/api" : "http://localhost:3001/api",
//   withCredentials: true,
// });

// export default api;
