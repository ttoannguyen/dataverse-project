import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred",
  });
};
