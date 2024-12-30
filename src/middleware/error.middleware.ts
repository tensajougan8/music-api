import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error: string | null = null
  ) {
    super(message);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log(err)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      data: null,
      message: err.message,
      error: err.error,
    });
  }

  return res.status(500).json({
    status: 500,
    data: null,
    message: "Internal server error",
    error: null,
  });
};