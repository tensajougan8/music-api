"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtistRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../entities/User");
const createArtistRoutes = (artistController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    router.get("/", artistController.getAll);
    router.get("/:id", artistController.getOne);
    router.post("/add-artist", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), artistController.create);
    router.put("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), artistController.update);
    router.delete("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), artistController.delete);
    return router;
};
exports.createArtistRoutes = createArtistRoutes;
