import { Request, Response } from "express";
import { authService } from "../services/authService";
import { LoginDto } from "../dtos/request/AuthDto";
import { AppError } from "../errors/AppError";

export const authController = {
  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body as LoginDto;
      if (!username || !password) {
        throw new AppError("Thiếu thông tin đăng nhập", 400);
      }
      const result = await authService.login({ username, password });
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken: result.accessToken, user: result.user });
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError("Lỗi đăng nhập: " + error.message, 401);
    }
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new AppError("Không có refresh token được cung cấp", 401);
      }
      const { accessToken, refreshToken: newRefreshToken } =
        await authService.refresh(refreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError("Lỗi làm mới token: " + error.message, 401);
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError("Lỗi đăng xuất: " + error.message, 500);
    }
  },
};
