/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LoginCredentials, LoginResponse } from "@/types/authType";
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: `${baseURL}/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};
