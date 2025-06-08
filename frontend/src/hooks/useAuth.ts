// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface JwtPayload {
  userId: string;
  exp: number;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
  error: string | null;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
    error: null,
  });

  const checkTokenValidity = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        error: null,
      });
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Token hết hạn → thử refresh
        const res = await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        const newDecoded: JwtPayload = jwtDecode(newAccessToken);

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          userId: newDecoded.userId,
          error: null,
        });
      } else {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          userId: decoded.userId,
          error: null,
        });
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        error: null,
      });
    }
  };

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        credentials,
        { withCredentials: true }
      );
      const token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      const decoded: JwtPayload = jwtDecode(token);

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        userId: decoded.userId,
        error: null,
      });
    } catch (err: any) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        error: err.response?.data?.message || "Đăng nhập thất bại",
      });
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.removeItem("accessToken");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      userId: null,
      error: null,
    });
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return { ...authState, handleLogin, logout };
};

export default useAuth;
