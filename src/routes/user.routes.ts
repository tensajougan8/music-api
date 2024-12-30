import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { UserRole } from "../entities/User";

export const createUserRoutes = (userController: UserController) => {
  const router = Router();
  router.use(authenticate);
  router.get("/", authorize([UserRole.ADMIN]), userController.getAll);
  router.post("/add-user", authorize([UserRole.ADMIN]), userController.addUser);
  router.delete("/:id", authorize([UserRole.ADMIN]), userController.deleteUser);
  router.put("/update-password", userController.updatePassword);

  return router;
};
