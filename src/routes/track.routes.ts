import { Router } from "express";
import { TrackController } from "../controllers/TrackController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../entities/User";

export const createTrackRoutes = (trackController: TrackController) => {
  const router = Router();

  router.use(authenticate);

  router.get("/", trackController.getAll);
  router.get("/:id", trackController.getOne);

  router.post(
    "/add-track",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    trackController.create
  );

  router.put(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    trackController.update
  );

  router.delete(
    "/:id",
    authorize([UserRole.ADMIN, UserRole.EDITOR]),
    trackController.delete
  );

  return router;
};
