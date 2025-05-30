/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // Access token hết hạn, gửi yêu cầu refresh
        try {
          const response = await axios.post<{ accessToken: string }>(
            "http://localhost:3000/auth/refresh",
            {},
            { withCredentials: true }
          );
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            userId: decoded.userId,
            error: null,
          });
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("accessToken");
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            userId: null,
            error: null,
          });
          navigate("/login");
        }
      } else {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          userId: decoded.userId,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem("accessToken");
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
        error: null,
      });
      navigate("/login");
    }
  };

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await axios.post<{ accessToken: string }>(
        "http://localhost:3000/api/_v1/auth/login",
        credentials,
        { withCredentials: true }
      );
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      const decoded: JwtPayload = jwtDecode(accessToken);
      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        userId: decoded.userId,
        error: null,
      });
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("accessToken");
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      userId: null,
      error: null,
    });
    navigate("/login");
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return { ...authState, handleLogin, logout };
};

export default useAuth;
