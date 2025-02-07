import { AppError } from "@/utils/AppError";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.5:3333",
});

// Isso irá acessar todas as minhas respostas que vem do back-end
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);
