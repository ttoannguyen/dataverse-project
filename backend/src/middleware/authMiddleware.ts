import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import config from "../config/config";

// Kiểm tra JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "abc";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET không được thiết lập trong biến môi trường");
}

interface JwtPayload {
  userId: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const fullPath = req.path.startsWith(config.server.API_BASE_URL)
    ? req.path.replace(config.server.API_BASE_URL, "")
    : req.path;

  // sua lai de chap nhan bien
  const isPublic = config.PUBLIC_ENDPOINTS.some((path) =>
    fullPath.startsWith(path.replace(/:.*$/, ""))
  );

  if (isPublic) return next();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Không có token được cung cấp", 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { id: payload.userId };
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token đã hết hạn", 401);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Token không hợp lệ", 401);
    }
    throw new AppError("Lỗi xác thực: " + error.message, 401);
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}
