/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { login } from "../services/api/authApi";
import type { LoginCredentials, LoginResponse } from "@/types/authType";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  userName: string | null;
  error: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    userId: null,
    userName: null,
    error: null,
    loading: false,
  });

  const handleLogin = async (credentials: LoginCredentials) => {
    setAuthState({ ...authState, loading: true, error: null });
    try {
      const response: LoginResponse = await login(credentials);
      console.log(response);
      setAuthState({
        isAuthenticated: true,
        token: response.accessToken,
        userId: response.user ? response.user.id : null,
        userName: response.user ? response.user.username : null,
        error: null,
        loading: false,
      });
      localStorage.setItem("token", response.accessToken);
    } catch (error) {
      setAuthState({
        ...authState,
        error: "Invalid credentials",
        loading: false,
      });
    }
  };

  return { authState, handleLogin };
};
