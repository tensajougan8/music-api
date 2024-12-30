"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrackRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../entities/User");
const createTrackRoutes = (trackController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    router.get("/", trackController.getAll);
    router.get("/:id", trackController.getOne);
    router.post("/add-track", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), trackController.create);
    router.put("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), trackController.update);
    router.delete("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), trackController.delete);
    return router;
};
exports.createTrackRoutes = createTrackRoutes;
