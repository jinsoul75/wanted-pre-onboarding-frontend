import axios from "axios";

const token = localStorage.getItem("access_token");

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => {
    console.error(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
  }
);
