import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = { id: payload.userId }; // Gắn userId vào req để sử dụng trong controller
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};
