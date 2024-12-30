import { Router } from "express";
import { AlbumController } from "../controllers/AlbumController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../entities/User";

export const createAlbumRoutes = (albumController: AlbumController) => {
  const router = Router();

  router.use(authenticate);

  router.get("/", albumController.getAll);
  router.get("/:id", albumController.getOne);

  router.post(
    "/add-album",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    albumController.create
  );

  router.put(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    albumController.update
  );

  router.delete(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    albumController.delete
  );

  return router;
};
