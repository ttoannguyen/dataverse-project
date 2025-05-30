/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3000/api/_v1/auth/login",
      credentials,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Login failed: " + (error.response?.data?.message || error.message)
    );
  }
};
