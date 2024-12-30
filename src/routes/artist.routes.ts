import { Router } from "express";
import { ArtistController } from "../controllers/ArtistController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../entities/User";

export const createArtistRoutes = (artistController: ArtistController) => {
  const router = Router();

  router.use(authenticate);

  router.get("/", artistController.getAll);
  router.get("/:id", artistController.getOne);

  router.post(
    "/add-artist",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    artistController.create
  );

  router.put(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    artistController.update
  );

  router.delete(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    artistController.delete
  );

  return router;
};
