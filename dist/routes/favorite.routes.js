"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoriteRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const createFavoriteRoutes = (favoriteController) => {
    const router = (0, express_1.Router)();
    router.use(auth_middleware_1.authenticate);
    // GET /favorites/:category - Retrieve favorites by category
    router.get("/:category", favoriteController.getFavorites);
    // POST /favorites/add-favorite - Add a new favorite
    router.post("/add-favorite", favoriteController.addFavorite);
    // DELETE /favorites/remove-favorite/:id - Remove a favorite
    router.delete("/remove-favorite/:id", favoriteController.removeFavorite);
    return router;
};
exports.createFavoriteRoutes = createFavoriteRoutes;
