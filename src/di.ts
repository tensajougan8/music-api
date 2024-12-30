import { container } from "tsyringe";
import { AuthService } from "./services/AuthService";
import { ArtistService } from "./services/ArtistService";
import { AlbumService } from "./services/AlbumService";
import { TrackService } from "./services/TrackService";
import { FavoriteService } from "./services/FavoriteService";
import { UserService } from "./services/UserService";

// Controllers
import { AuthController } from "./controllers/AuthController";
import { ArtistController } from "./controllers/ArtistController";
import { AlbumController } from "./controllers/AlbumController";
import { TrackController } from "./controllers/TrackController";
import { FavoriteController } from "./controllers/FavoriteController";
import { UserController } from "./controllers/UserController";
import { User } from "./entities/User";
import { AppDataSource } from "./db";
import { Session } from "./entities/Session";
import { Track } from "./entities/Track";
import { Album } from "./entities/Album";
import { Artist } from "./entities/Artist";
import { Favorite } from "./entities/Favorite";

export const configureContainer = () => {

    container.register("UserRepository", {
      useFactory: () => AppDataSource.getRepository(User),
    });

    
    container.register("SessionRepository", {
      useFactory: () => AppDataSource.getRepository(Session),
    });
    container.register("TrackRepository", {
      useFactory: () => AppDataSource.getRepository(Track),
    });
    container.register("AlbumRepository", {
      useFactory: () => AppDataSource.getRepository(Album),
    });
    container.register("ArtistRepository", {
      useFactory: () => AppDataSource.getRepository(Artist),
    });
    container.register("FavoriteRepository", {
      useFactory: () => AppDataSource.getRepository(Favorite),
    });
  // Services
  container.registerSingleton(AuthService);
  container.registerSingleton(ArtistService);
  container.registerSingleton(AlbumService);
  container.registerSingleton(TrackService);
  container.registerSingleton(FavoriteService);
  container.registerSingleton(UserService);

  // Controllers
  container.registerSingleton(AuthController);
  container.registerSingleton(ArtistController);
  container.registerSingleton(AlbumController);
  container.registerSingleton(TrackController);
  container.registerSingleton(FavoriteController);
  container.registerSingleton(UserController);
};
