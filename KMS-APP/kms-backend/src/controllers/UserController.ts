import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { userService } from "../services/UserService";
import { RegisterDto } from "../dtos/request/AuthDto";
import { UserResponseDto } from "../dtos/response/UserResponseDto";

// Định nghĩa RegisterRequest
interface RegisterRequest extends Request {
  body: RegisterDto;
}

// Tạo instance của controller với arrow function
export const userController = {
  getUsers: async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },

  registerUser: async (req: RegisterRequest, res: Response): Promise<void> => {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  },
};
