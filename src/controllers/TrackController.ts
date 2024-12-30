import { Request, Response, NextFunction } from "express";
import { TrackService } from "../services/TrackService";
import { AuthRequest } from "../middleware/auth.middleware";
import { injectable } from "tsyringe";

@injectable()
export class TrackController {
  constructor(private trackService: TrackService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tracks = await this.trackService.findAll(req.query);
      const formattedTracks = tracks.map((track) => ({
        track_id: track.id,
        artist_name: track.artist.name,
        album_name: track.album.name,
        name: track.name,
        duration: track.duration,
        hidden: track.hidden,
      }));

      res.json({
        status: 200,
        data: formattedTracks,
        message: "Tracks retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const track = await this.trackService.findOne(req.params.id);
      const formattedTrack = {
        track_id: track.id,
        artist_name: track.artist.name,
        album_name: track.album.name,
        name: track.name,
        duration: track.duration,
        hidden: track.hidden,
      };

      res.json({
        status: 200,
        data: formattedTrack,
        message: "Track retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.trackService.create(req.body);
      res.status(201).json({
        status: 201,
        data: null,
        message: "Track created successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.trackService.update(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const track = await this.trackService.delete(req.params.id);
      res.json({
        status: 200,
        data: null,
        message: `Track:${track.name} deleted successfully.`,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
