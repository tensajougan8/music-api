import { Request, Response, NextFunction } from "express";
import { ArtistService } from "../services/ArtistService";
import { AuthRequest } from "../middleware/auth.middleware";
import { injectable } from "tsyringe";

@injectable()
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artists = await this.artistService.findAll(req.query);
      res.json({
        status: 200,
        data: artists,
        message: "Artists retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist = await this.artistService.findOne(req.params.id);
      res.json({
        status: 200,
        data: artist,
        message: "Artist retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.artistService.create(req.body);
      res.status(201).json({
        status: 201,
        data: null,
        message: "Artist created successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.artistService.update(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const artist = await this.artistService.delete(req.params.id);
      res.json({
        status: 200,
        data: null,
        message: `Artist:${artist.name} deleted successfully.`,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
