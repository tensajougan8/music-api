import { Request, Response, NextFunction } from "express";
import { AlbumService } from "../services/AlbumService";
import { injectable } from "tsyringe";

@injectable()
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const albums = await this.albumService.findAll(req.query);
      const formattedAlbums = albums.map((album) => ({
        album_id: album.id,
        artist_name: album.artist?.name,
        name: album.name,
        year: album.year,
        hidden: album.hidden,
      }));

      res.json({
        status: 200,
        data: formattedAlbums,
        message: "Albums retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const album = await this.albumService.findOne(req.params.id);
      const formattedAlbum = {
        album_id: album.id,
        artist_name: album.artist?.name,
        name: album.name,
        year: album.year,
        hidden: album.hidden,
      };

      res.json({
        status: 200,
        data: formattedAlbum,
        message: "Album retrieved successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.albumService.create(req.body);
      res.status(201).json({
        status: 201,
        data: null,
        message: "Album created successfully.",
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.albumService.update(req.params.id, req.body);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const album = await this.albumService.delete(req.params.id);
      res.json({
        status: 200,
        data: null,
        message: `Album:${album.name} deleted successfully.`,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
