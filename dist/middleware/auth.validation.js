"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginRequest = exports.validateSignupRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const error_middleware_1 = require("./error.middleware");
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string()
        .min(8)
        .max(30)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password cannot exceed 30 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "any.required": "Password is required",
    }),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().required().messages({
        "any.required": "Password is required",
    }),
});
const validateSignupRequest = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const formattedErrors = error.details
            .map((err) => err.message)
            .join(", ");
        return next(new error_middleware_1.ApiError(400, "Validation Error", formattedErrors));
    }
    next();
};
exports.validateSignupRequest = validateSignupRequest;
const validateLoginRequest = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const formattedErrors = error.details
            .map((err) => err.message)
            .join(", ");
        return next(new error_middleware_1.ApiError(400, "Validation Error", formattedErrors));
    }
    next();
};
exports.validateLoginRequest = validateLoginRequest;
