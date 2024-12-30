"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoriteRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const createFavoriteRoutes = (favoriteController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    router.get("/:category", favoriteController.getFavorites);
    router.post("/add-favorite", favoriteController.addFavorite);
    router.delete("/remove-favorite/:id", favoriteController.removeFavorite);
    return router;
};
exports.createFavoriteRoutes = createFavoriteRoutes;
