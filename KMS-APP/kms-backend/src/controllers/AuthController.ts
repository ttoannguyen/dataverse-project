import { Request, Response } from "express";
import { LoginDto } from "../dtos/request/AuthDto";
import { LoginResponse } from "../dtos/response/LoginResponse";
import { authService } from "../services/AuthServices";

interface LoginRequest extends Request {
  body: LoginDto;
}
export const authController = {
  login: async (req: LoginRequest, res: Response): Promise<void> => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};
