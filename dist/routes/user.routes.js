"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../entities/User");
const createUserRoutes = (userController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    router.get("/", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN]), userController.getAll);
    router.post("/add-user", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN]), userController.addUser);
    router.delete("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN]), userController.deleteUser);
    router.put("/update-password", userController.updatePassword);
    return router;
};
exports.createUserRoutes = createUserRoutes;
