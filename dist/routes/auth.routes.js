"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_validation_1 = require("../middleware/auth.validation");
const createAuthRoutes = (authController) => {
    const router = (0, express_1.Router)();
    router.post("/signup", auth_validation_1.validateSignupRequest, authController.signup);
    router.post("/login", auth_validation_1.validateLoginRequest, authController.login);
    router.get("/logout", auth_middleware_1.authenticate, authController.logout);
    return router;
};
exports.createAuthRoutes = createAuthRoutes;
