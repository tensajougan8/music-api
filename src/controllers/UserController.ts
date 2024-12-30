import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ApiError } from "../middleware/error.middleware";
import { UserRole } from "../entities/User";
import { injectable } from "tsyringe";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.register(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, offset, role } = req.query;

      const users = await this.userService.findAll({
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
        role: role as UserRole,
      });

      return res.status(200).json({
        status: 200,
        data: users,
        message: "Users retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  addUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.body.user!.id;
      if (!adminId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const { email, password, role } = req.body;
      if (!email || !password || !role) {
        throw new ApiError(400, "Missing required fields");
      }

      await this.userService.addUser(adminId, { email, password, role });

      return res.status(201).json({
        status: 201,
        data: null,
        message: "User created successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.body.user?.id;
      if (!adminId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const userId = req.params.id;
      if (!userId) {
        throw new ApiError(400, "User ID is required");
      }

      await this.userService.deleteUser(adminId, userId);

      return res.status(200).json({
        status: 200,
        data: null,
        message: "User deleted successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.user?.id;
      if (!userId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const { old_password, new_password } = req.body;
    
        if (!old_password || !new_password) {
          throw new ApiError(400, "Missing required fields");
        }
        else if (old_password === new_password) {
          throw new ApiError(400, "New password as old password");
        }



      await this.userService.updatePassword(userId, {
        old_password,
        new_password,
      });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
