import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createAuthRoutes } from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import { AuthController } from "./controllers/AuthController";
import { AlbumController } from "./controllers/AlbumController";
import { ArtistController } from "./controllers/ArtistController";
import { FavoriteController } from "./controllers/FavoriteController";
import { TrackController } from "./controllers/TrackController";
import { UserController } from "./controllers/UserController";
import { createArtistRoutes } from "./routes/artist.routes";
import { createAlbumRoutes } from "./routes/album.routes";
import { createTrackRoutes } from "./routes/track.routes";
import { createUserRoutes } from "./routes/user.routes";
import { createFavoriteRoutes } from "./routes/favorite.routes";

export const createApp = (
  authController: AuthController,
  artistController: ArtistController,
  albumController: AlbumController,
  trackController: TrackController,
  favoriteController: FavoriteController,
  userController: UserController

) => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());


  app.use("/api/v1", createAuthRoutes(authController));
  app.use("/api/v1/artists", createArtistRoutes(artistController));
  app.use("/api/v1/albums", createAlbumRoutes(albumController));
  app.use("/api/v1/tracks", createTrackRoutes(trackController));
  app.use("/api/v1/favorites", createFavoriteRoutes(favoriteController));
  app.use("/api/v1/users", createUserRoutes(userController));
 
  app.use(errorHandler);

  return app;
};
