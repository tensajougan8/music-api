import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/auth.middleware";
import {
  validateSignupRequest,
  validateLoginRequest,
} from "../middleware/auth.validation";

export const createAuthRoutes = (authController: AuthController) => {
  const router = Router();

  router.post("/signup", validateSignupRequest, authController.signup);
  router.post("/login", validateLoginRequest, authController.login);
  router.get("/logout", authenticate, authController.logout);

  return router;
};
