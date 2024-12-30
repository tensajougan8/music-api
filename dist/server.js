"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Required for tsyringe
const tsyringe_1 = require("tsyringe");
const di_1 = require("./di");
const app_1 = require("./app");
// Import controllers (automatically registered in the DI container)
const AuthController_1 = require("./controllers/AuthController");
const ArtistController_1 = require("./controllers/ArtistController");
const AlbumController_1 = require("./controllers/AlbumController");
const TrackController_1 = require("./controllers/TrackController");
const FavoriteController_1 = require("./controllers/FavoriteController");
const UserController_1 = require("./controllers/UserController");
const db_1 = require("./db");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        console.log("Database connected!");
        (0, di_1.configureContainer)();
        const authController = tsyringe_1.container.resolve(AuthController_1.AuthController);
        const artistController = tsyringe_1.container.resolve(ArtistController_1.ArtistController);
        const albumController = tsyringe_1.container.resolve(AlbumController_1.AlbumController);
        const trackController = tsyringe_1.container.resolve(TrackController_1.TrackController);
        const favoriteController = tsyringe_1.container.resolve(FavoriteController_1.FavoriteController);
        const userController = tsyringe_1.container.resolve(UserController_1.UserController);
        // Create app
        const app = (0, app_1.createApp)(authController, artistController, albumController, trackController, favoriteController, userController);
        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
startServer();
