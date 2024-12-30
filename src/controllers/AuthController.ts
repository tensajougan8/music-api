import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import { ApiError } from "../middleware/error.middleware";
import { AuthRequest } from "../middleware/auth.middleware";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { AppDataSource } from "../db";
import { injectable } from "tsyringe";

@injectable()
export class AuthController {
  constructor(private authService: AuthService) {
    const userRepository = AppDataSource.getRepository(User);
    const sessionRepository = AppDataSource.getRepository(Session);
    this.authService = new AuthService(userRepository, sessionRepository);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);

      res.json({
        status: 200,
        data: { token },
        message: "Login successful.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await this.authService.signup(email, password);

      res.status(201).json({
        status: 201,
        data: null,
        message: "User created successfully.",
        error: null,
      });
    } catch (error: any) {
      if (error.code === "23505") {
        next(new ApiError(409, "Email already exists."));
      } else {
        next(error);
      }
    }
  };

  logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new ApiError(400, "Bad Request");
      }

      await this.authService.logout(req.user.id);
      res.json({
        status: 200,
        data: null,
        message: "User logged out successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
