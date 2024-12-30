"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, error = null) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.ApiError = ApiError;
const errorHandler = (err, req, res, next) => {
    console.log(err);
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
exports.errorHandler = errorHandler;
