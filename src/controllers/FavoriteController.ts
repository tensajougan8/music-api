import { Request, Response, NextFunction } from "express";
import { FavoriteService } from "../services/FavoriteService";
import { ApiError } from "../middleware/error.middleware";
import { injectable } from "tsyringe";

@injectable()
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  /**
   * GET /favorites/:category
   * Retrieve user's favorites by category
   */
  getFavorites = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.user?.id; // Assuming user object is attached by auth middleware
      if (!userId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const category = req.params.category;
      const { limit, offset } = req.query;

      // Validate category
      if (!["artist", "album", "track"].includes(category)) {
        throw new ApiError(
          400,
          "Invalid category. Must be 'artist', 'album', or 'track'"
        );
      }

      const favorites = await this.favoriteService.findAll(userId, {
        category,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });

      return res.status(200).json({
        status: 200,
        data: favorites,
        message: "Favorites retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /favorites/add-favorite
   * Add a new favorite
   */
  addFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.user?.id;
      if (!userId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const { category, item_id } = req.body;

      // Validate required fields
      if (!category || !item_id) {
        throw new ApiError(400, "Category and item_id are required");
      }

      // Validate category
      if (!["artist", "album", "track"].includes(category)) {
        throw new ApiError(
          400,
          "Invalid category. Must be 'artist', 'album', or 'track'"
        );
      }

      await this.favoriteService.create(userId, {
        category,
        item_id,
      });

      return res.status(201).json({
        status: 201,
        data: null,
        message: "Favorite added successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /favorites/remove-favorite/:id
   * Remove a favorite
   */
  removeFavorite = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.body.user?.id;
      if (!userId) {
        throw new ApiError(401, "Unauthorized Access");
      }

      const favoriteId = req.params.id;

      if (!favoriteId) {
        throw new ApiError(400, "Favorite ID is required");
      }

      await this.favoriteService.delete(userId, favoriteId);

      return res.status(200).json({
        status: 200,
        data: null,
        message: "Favorite removed successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
