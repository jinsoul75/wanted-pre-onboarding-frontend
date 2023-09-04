import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem("access_token");

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
