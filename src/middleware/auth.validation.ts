import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./error.middleware";

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "any.required": "Password is required",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const validateSignupRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details
      .map((err: any) => err.message)
      .join(", ");
    return next(new ApiError(400, "Validation Error", formattedErrors));
  }

  next();
};

export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details
      .map((err: any) => err.message)
      .join(", ");
    return next(new ApiError(400, "Validation Error", formattedErrors));
  }

  next();
};
