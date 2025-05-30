import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  console.error("Lỗi server:", error);
  res.status(500).json({
    message: "Lỗi server không xác định",
  });
};
