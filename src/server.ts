import "reflect-metadata"; // Required for tsyringe
import { DataSource } from "typeorm";
import { container } from "tsyringe";
import { configureContainer } from "./di";
import { createApp } from "./app";


// Import controllers (automatically registered in the DI container)
import { AuthController } from "./controllers/AuthController";
import { ArtistController } from "./controllers/ArtistController";
import { AlbumController } from "./controllers/AlbumController";
import { TrackController } from "./controllers/TrackController";
import { FavoriteController } from "./controllers/FavoriteController";
import { UserController } from "./controllers/UserController";
import { AppDataSource } from "./db";

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

    configureContainer();

    const authController = container.resolve(AuthController);
    const artistController = container.resolve(ArtistController);
    const albumController = container.resolve(AlbumController);
    const trackController = container.resolve(TrackController);
    const favoriteController = container.resolve(FavoriteController);
    const userController = container.resolve(UserController);

    // Create app
    const app = createApp(
      authController,
      artistController,
      albumController,
      trackController,
      favoriteController,
      userController
    );

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
