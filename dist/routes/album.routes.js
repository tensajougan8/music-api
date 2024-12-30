"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbumRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const User_1 = require("../entities/User");
const createAlbumRoutes = (albumController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    router.get("/", albumController.getAll);
    router.get("/:id", albumController.getOne);
    router.post("/add-album", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), albumController.create);
    router.put("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), albumController.update);
    router.delete("/:id", (0, auth_middleware_1.authorize)([User_1.UserRole.ADMIN, User_1.UserRole.EDITOR]), albumController.delete);
    return router;
};
exports.createAlbumRoutes = createAlbumRoutes;
