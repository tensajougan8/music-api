import { Router } from "express";
import { FavoriteController } from "../controllers/FavoriteController";
import { authenticate } from "../middleware/auth.middleware";

export const createFavoriteRoutes = (
  favoriteController: FavoriteController
) => {
  const router = Router();

  router.use(authenticate);

  // GET /favorites/:category - Retrieve favorites by category
  router.get("/:category", favoriteController.getFavorites);

  // POST /favorites/add-favorite - Add a new favorite
  router.post("/add-favorite", favoriteController.addFavorite);

  // DELETE /favorites/remove-favorite/:id - Remove a favorite
  router.delete("/remove-favorite/:id", favoriteController.removeFavorite);

  return router;
};
