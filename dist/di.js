"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureContainer = void 0;
const tsyringe_1 = require("tsyringe");
const AuthService_1 = require("./services/AuthService");
const ArtistService_1 = require("./services/ArtistService");
const AlbumService_1 = require("./services/AlbumService");
const TrackService_1 = require("./services/TrackService");
const FavoriteService_1 = require("./services/FavoriteService");
const UserService_1 = require("./services/UserService");
// Controllers
const AuthController_1 = require("./controllers/AuthController");
const ArtistController_1 = require("./controllers/ArtistController");
const AlbumController_1 = require("./controllers/AlbumController");
const TrackController_1 = require("./controllers/TrackController");
const FavoriteController_1 = require("./controllers/FavoriteController");
const UserController_1 = require("./controllers/UserController");
const User_1 = require("./entities/User");
const db_1 = require("./db");
const Session_1 = require("./entities/Session");
const Track_1 = require("./entities/Track");
const Album_1 = require("./entities/Album");
const Artist_1 = require("./entities/Artist");
const Favorite_1 = require("./entities/Favorite");
const configureContainer = () => {
    tsyringe_1.container.register("UserRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(User_1.User),
    });
    tsyringe_1.container.register("SessionRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(Session_1.Session),
    });
    tsyringe_1.container.register("TrackRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(Track_1.Track),
    });
    tsyringe_1.container.register("AlbumRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(Album_1.Album),
    });
    tsyringe_1.container.register("ArtistRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(Artist_1.Artist),
    });
    tsyringe_1.container.register("FavoriteRepository", {
        useFactory: () => db_1.AppDataSource.getRepository(Favorite_1.Favorite),
    });
    // Services
    tsyringe_1.container.registerSingleton(AuthService_1.AuthService);
    tsyringe_1.container.registerSingleton(ArtistService_1.ArtistService);
    tsyringe_1.container.registerSingleton(AlbumService_1.AlbumService);
    tsyringe_1.container.registerSingleton(TrackService_1.TrackService);
    tsyringe_1.container.registerSingleton(FavoriteService_1.FavoriteService);
    tsyringe_1.container.registerSingleton(UserService_1.UserService);
    // Controllers
    tsyringe_1.container.registerSingleton(AuthController_1.AuthController);
    tsyringe_1.container.registerSingleton(ArtistController_1.ArtistController);
    tsyringe_1.container.registerSingleton(AlbumController_1.AlbumController);
    tsyringe_1.container.registerSingleton(TrackController_1.TrackController);
    tsyringe_1.container.registerSingleton(FavoriteController_1.FavoriteController);
    tsyringe_1.container.registerSingleton(UserController_1.UserController);
};
exports.configureContainer = configureContainer;
