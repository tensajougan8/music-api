import { Router } from "express";
import { FavoriteController } from "../controllers/FavoriteController";
import { authenticate } from "../middleware/auth.middleware";

export const createFavoriteRoutes = (
  favoriteController: FavoriteController
) => {
  const router = Router();

  router.use(authenticate);
  router.get("/:category", favoriteController.getFavorites);
  router.post("/add-favorite", favoriteController.addFavorite);
  router.delete("/remove-favorite/:id", favoriteController.removeFavorite);

  return router;
};
